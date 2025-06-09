import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const handleComprar = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    // Navegar a la página de checkout o proceso de compra
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((curso) => (
              <li
                key={curso.id}
                className="mb-4 p-4 border rounded shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{curso.titulo}</h2>
                  <p>${curso.precio.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(curso.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-6">
            <button
              onClick={vaciarCarrito}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handleComprar}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Comprar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
