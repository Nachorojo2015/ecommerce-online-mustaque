import { client } from "@/lib/mercadopago";
import crypto from "crypto";
import { Payment } from "mercadopago";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const headers = req.headers;

  console.log("Respuesta del body", body);

  // Verificación de la notificación enviada por Mercado Pago.

  const xSignature = headers.get("x-signature");
  const xRequestId = headers.get("x-request-id");

  const { searchParams } = new URL(req.url);
  const dataID = searchParams.get("data.id");

  if (!xSignature || !dataID) {
    console.log("Falta x-signature o data.id");
    return new Response("Invalid signature", { status: 401 });
  }

  const parts = xSignature.split(",");

  let ts;
  let hash;

  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const secret = process.env.MP_SECRET_KEY!;

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);

  const sha = hmac.digest("hex");

  if (sha !== hash) {
    console.log("HMAC verification failed");
    return new Response("Invalid signature", { status: 401 });
  }

  console.log("HMAC verification pass");
  console.log("Notificación válida");

  // Mercado Pago manda notificaciones de distintos tópicos (payment,
  // merchant_order, etc). Solo procesamos las de pago.
  if (body.type !== "payment") {
    console.log("Notificación ignorada, type:", body.type);
    return new Response(null, { status: 200 });
  }

  try {
    const payment = new Payment(client);
    const data = await payment.get({
      id: dataID,
    });

    console.log(data);

    console.log("external_reference:", data.external_reference);

    const orderId = data.external_reference;

    if (!orderId) {
      console.error("Pago sin external_reference:", data.id);
      return new Response(null, { status: 200 });
    }

    const dbClient = await pool.connect();

    try {
      await dbClient.query("BEGIN");

      const { rows, rowCount } = await dbClient.query(
        `SELECT payment_status FROM orders WHERE id = $1 FOR UPDATE`,
        [orderId],
      );

      if (rowCount === 0) {
        console.error("Orden no encontrada para el pago:", orderId);
        await dbClient.query("ROLLBACK");
        return new Response(null, { status: 200 });
      }

      const currentPaymentStatus = rows[0].payment_status;

      if (data.status === "approved" && currentPaymentStatus !== "paid") {
        await dbClient.query(
          `UPDATE orders SET status = 'paid', payment_status = 'paid' WHERE id = $1`,
          [orderId],
        );

        console.log("Pago confirmado.");
      } else if (
        (data.status === "rejected" || data.status === "cancelled") &&
        currentPaymentStatus === "pending"
      ) {
        await dbClient.query(
          `UPDATE orders SET status = 'cancelled', payment_status = 'failed' WHERE id = $1`,
          [orderId],
        );

        // El stock se había reservado al crear la orden; si el pago no se
        // concreta, se devuelve.
        await dbClient.query(
          `UPDATE product_sizes ps
           SET stock = ps.stock + oi.quantity
           FROM order_items oi
           WHERE oi.order_id = $1
             AND oi.product_id = ps.product_id
             AND oi.size = ps.size::text`,
          [orderId],
        );

        console.log("Pago rechazado, orden cancelada y stock repuesto.");
      }

      await dbClient.query("COMMIT");
    } catch (error) {
      await dbClient.query("ROLLBACK");
      throw error;
    } finally {
      dbClient.release();
    }
  } catch (error) {
    console.error(error);

    // Devolvemos 500 para que Mercado Pago reintente la notificación en vez
    // de darla por procesada cuando en realidad falló.
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
}
