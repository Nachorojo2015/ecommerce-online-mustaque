import { getOrders } from "@/actions/orders/get-orders";
import { currencyFormat } from "@/utils/currency-format";
import Logo from "@/components/ui/Logo";
import DeleteOrderButton from "@/components/admin/DeleteOrderButton";

const STATUS_BADGE: Record<string, string> = {
  pending: "badge-warning",
  paid: "badge-success",
  cancelled: "badge-error",
  failed: "badge-error",
};

function formatDate(date: string) {
  return new Date(date).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default async function OrdenesPage() {
  const orders = await getOrders();

  return (
    <div className="p-6 flex flex-col items-center">
      <Logo />

      <h1 className="text-3xl font-bold mb-8">Órdenes de compra</h1>

      {orders.length === 0 ? (
        <p className="text-center font-bold">No hay órdenes disponibles</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-4xl">
          {orders.map((order) => (
            <div
              key={order.id}
              className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm"
            >
              <input type="checkbox" />

              <div className="collapse-title flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-base-content/70">
                    #{order.id}
                  </span>
                  <span className="text-sm text-base-content/70">
                    {formatDate(order.created_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`badge ${STATUS_BADGE[order.status] ?? "badge-neutral"}`}
                  >
                    {order.status}
                  </span>
                  <span
                    className={`badge ${STATUS_BADGE[order.payment_status] ?? "badge-neutral"}`}
                  >
                    {order.payment_status}
                  </span>
                  <span className="font-bold">
                    {currencyFormat(order.total)}
                  </span>
                </div>
              </div>

              <div className="collapse-content">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h3 className="font-bold mb-2">Datos del comprador</h3>
                    <p>{order.address.fullname}</p>
                    <p>{order.address.email}</p>
                    <p>{order.address.phone}</p>
                    <p>
                      {order.address.address}
                      {order.address.address2 ? `, ${order.address.address2}` : ""}
                    </p>
                    <p>
                      {order.address.city}, {order.address.postal_code}
                    </p>
                    <p>{order.address.country}</p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Resumen</h3>
                    <p>Subtotal: {currencyFormat(order.subtotal)}</p>
                    <p>Envío: {currencyFormat(order.shipping_cost)}</p>
                    <p className="font-bold">
                      Total: {currencyFormat(order.total)}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold mt-6 mb-2">Productos</h3>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Talle</th>
                        <th>Cantidad</th>
                        <th>Precio unit.</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.product_title ?? item.product_id}</td>
                          <td>{item.size ?? "-"}</td>
                          <td>{item.quantity}</td>
                          <td>{currencyFormat(item.unit_price)}</td>
                          <td>{currencyFormat(item.total_price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-4">
                  <DeleteOrderButton orderId={order.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
