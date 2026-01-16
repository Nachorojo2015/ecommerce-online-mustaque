import { client } from "@/lib/mercadopago";
import crypto from "crypto";
import { Payment } from "mercadopago";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const headers = req.headers;

  console.log("Respuesta del body", body);

  // Verificación de la notificación enviada por Mercado Pago.

  const xSignature = headers.get("x-signature") as string;
  const xRequestId = headers.get("x-request-id");

  const { searchParams } = new URL(req.url);
  const dataID = searchParams.get("data.id");

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
    throw new Error("Notificación inválida");
  }

  console.log("HMAC verification pass")
  console.log("Notificación válida");

  try {
    const payment = new Payment(client);
    const data = await payment.get({
      id: dataID!,
    });

    console.log(data);

    if (data.status === "approved") {
       await pool.query(`
       UPDATE orders
       SET status = 'paid', payment_status = 'paid'
       WHERE id = $1
      `, [data.metadata.orderId]);

      console.log("Pago confirmado.");
    }
  } catch (error) {
    console.error(error);
  }

  return new Response(null, { status: 200 });
}
