import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useUsuario } from "../context/UserContext";


const Carrito = () => {
 const { carrito, incrementarCantidad, disminuirCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito()

  const { agregarCurso } = useUsuario();

  const navigate = useNavigate();

  const handleCompra = () => {
    carrito.forEach((curso) => agregarCurso(curso.id));
    vaciarCarrito();
    alert("✅ ¡Tu curso fue tomado con éxito!");
    navigate("/perfil");
  };
  
  const totalGeneral = carrito.reduce ((total, curso)=>total + (curso.precio*curso.count),0)

// metodo para realizar el pago
   
  const handlePayment = async () => {
    const token = localStorage.getItem("token")
    if (!token){
      alert ('Debes iniciar sesión para realizar el pago')
      navigate ("/login")
      return
    }
    // crear los datos a enviar
    const orderData = {
      carrito, // el carrito con todas las pizzas y cantidades
      total: totalGeneral, // el total general de la compra
    }
    try {
      const response = await fetch ('http://localhost:5000/api/checkouts',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`, // enviar el token en los encabezados para autenticacion
        },
        body: JSON.stringify(orderData), // convertir los datos del carrito a JSON
      })
      const data = await response.json ()
      if (response.ok) {
        //si el pago es exitoso, es posible mostrar un mensaje o redirigir
      //  alert ('Pago exitoso.Gracias por tu compra!')
        vaciarCarrito()
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", totalGeneral);
        navigate ("/pago")
            //en este punto es posible redirigir al usuario a una pagina de confirmación de pago
       } else {
        // si el backend retorna un error
        navigate ("/login")
        alert (data?.error || 'Hubo un problema con el pago, por favor inténtalo nuevamente')
      }
      } catch (error) {
        console.log ('Error al procesar el pago:', error)
        alert ('Hubo un error al procesar el pago')
      }
    }
  
  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">Detalles del Carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
         <div className="grid grid-cols-6 gap-4 font-bold border-b pb-2 mb-4">
          <span></span>
          <span>Título</span>
          <span>Precio</span>
          <span>Cantidad</span>
          <span>Subtotal</span>
          <span></span>
          </div>

          <ul>
              {carrito.map((curso) => (
              <li
                key={curso.id}
                className="grid grid-cols-6 gap-4 items-center mb-4 p-4 border rounded shadow"
              >                
                  <img 
                  src={curso.imagen}
                  width={70} 
                  alt={`Imagen de ${curso.titulo}`}  className="object-cover rounded" 
                  />
                  <h2 className="text-xl font-semibold">{curso.titulo}</h2>
                  <p>${curso.precio.toLocaleString()}</p>
                
                 <div className="flex items-center gap-2">
                   <button
                  onClick={() => disminuirCantidad(curso.id)}
                  className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                    >
                    <FiChevronDown />
                  </button>
                 <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                 {curso.count}
                </span>
                 <button
                onClick={() => incrementarCantidad(curso.id)}
                className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                  >
                <FiChevronUp />
                </button>
                </div>

               <span className="text-sm">
                $ {(curso.count*curso.precio).toLocaleString()}
                </span> 

                <button
                  onClick={() => eliminarDelCarrito(curso.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">          
                   Eliminar
                </button>

                </li>
                 ))}      
              </ul>

           <div className="mt-8 bg-yellow-100 text-yellow-800 text-center text-lg font-semibold py-4 px-6 rounded shadow-md w-fit mx-auto">
            Total a pagar: ${totalGeneral.toLocaleString()}
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold block mx-auto"
            >
          Pagar ahora
          </button>

          <button
            onClick={vaciarCarrito}
            className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            Vaciar carrito
          </button>
          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              onClick={handleCompra}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Acceso a tus cursos
            </button>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
