export default function HowPurchasePage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-2">Como comprar</h1>

      <h2 className="text-center text-3xl font-bold">
        Te dejamos los pasos para hacer una compra en nuestra página web:
      </h2>

      <ol className="flex flex-col items-center gap-4 mt-5">
        <li>1. Elegí la categoría que estás buscando</li>
        <li>
          2. Seleccionás tus preferencias de talle y hacés click en AGREGAR AL
          CARRITO.
        </li>
        <li>
          3. Una vez que estás en el carrito de compras, podés seguir comprando
          o avanzar haciendo click en INICIAR COMPRA.
        </li>
        <li>4. Completa tus datos de contacto y hacé click en CONTINUAR.</li>
        <li>
          5. Seleccioná el método de envío que desees y hacé clic en CONTINUAR.
        </li>
        <li>
          6. Elegí el método de pago y completá los datos. Hacé click en INICIAR
          PAGO.
        </li>
        <li>
          7. Listo! Vas e recibir el mail de confirmación de compras en tu e-mail!
          En caso de no recibirlo te pedimos que revises la casilla de correo no
          deseado, spam o promociones.
        </li>
      </ol>
    </div>
  );
}
