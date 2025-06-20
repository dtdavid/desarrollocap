import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PagoConfirmado = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-green-50 px-4">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">¡Pago exitoso!</h1>
      <p className="text-lg text-green-800 mb-6">Gracias por tu compra. En breve recibirás un correo con los detalles.</p>
      
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PagoConfirmado;
