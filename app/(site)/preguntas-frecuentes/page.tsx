import Image from "next/image";

export default function QuestionsPage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-2">
        Preguntas frecuentes
      </h1>

      <h2 className="text-center text-2xl">¿Cuáles son los métodos de pago?</h2>

      <p className="text-center">
        Para las compras online, contamos con todas las tarjetas de créditos,
        débito, Mercado Pago y pagos en efectivo.
      </p>

      <p className="text-center">Podrás visualizarlas de esta manera al momento de cerrar tu compra:</p>

      <Image src={'/payments.jpg'} alt="payment-methods" width={700} height={700} className="object-cover rounded-sm mt-4 mx-auto" />
    </div>
  );
}
