import { useState } from "react";

const Pago = ({ carrito, total }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí iría el llamado a la API o pasarela de pago
    const datosPago = {
      nombre,
      email,
      metodoPago,
      carrito,
      total,
    };

    console.log("Procesando pago con:", datosPago);
    // Redireccionar o mostrar confirmación...
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Información del usuario */}
        <div>
          <label className="block mb-1">Nombre completo</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Métodos de pago */}
        <div>
          <label className="block mb-1">Método de pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="tarjeta">Tarjeta de Crédito/Débito</option>
            <option value="transferencia">Transferencia Bancaria</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Resumen del carrito */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Resumen del Pedido</h2>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.titulo} × {item.count}</span>
                <span>${(item.precio * item.count).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold mt-2">
            Total: ${total.toLocaleString()}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Confirmar y Pagar
        </button>
      </form>
    </div>
  );
};

export default Pago;
