export default function ExchangePolicyPage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-2">
        Politica de cambios
      </h1>

      <ul className="flex flex-col items-center gap-4 mt-5">
        <li>
          Tenés 30 días corridos desde que realizaste la compra para cambios.
        </li>
        <li>
          Deberás presentar el ticket de compra o cambio. En caso de compras
          online, la factura electrónica o acreditar el número de orden.
        </li>
        <li>
          Los productos deben estar en perfecto estado y con todas las etiquetas
          originales.
        </li>
        <li>
          Podrás cambiarlo por cualquier otro producto de igual valor o varios
          productos que sumen el monto del mismo. En caso de que superen al
          valor del comprado, la diferencia será abonada al momento del cambio.
        </li>
        <li>
          Los costos del reenvío de los productos están a cargo del cliente.
        </li>
      </ul>

      <p className="text-center mt-3">
        Te podes comunicar por WhatsApp <b className="font-bold">1125833679</b>{" "}
        y/o mail <b className="font-bold"> ventas@mustaqe.com.ar</b>.
      </p>
    </div>
  );
}
