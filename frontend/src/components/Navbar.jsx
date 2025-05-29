import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // ícono de logout

export default function Navbar() {
  const navigate = useNavigate();

  // Recuperamos el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-azul text-white p-2 flex justify-between px-4">
      <div className="flex gap-4 items-center">
        {user && <span className="font-semibold">Hola, {user.nombre}</span>}
        <Link to="/perfil" className="hover:underline">Mi perfil</Link>
      </div>
      
      {user && (
        <button
          onClick={handleLogout}
          className="relative group p-1 rounded hover:bg-red-600 transition-colors"
          aria-label="Cerrar sesión"
        >
          <FiLogOut size={20} className="text-white" />
          <span
            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                       bg-gray-700 text-white text-xs rounded px-2 py-1 
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                       transition-opacity pointer-events-none whitespace-nowrap"
          >
            Cerrar sesión
          </span>
        </button>
      )}
    </nav>
  );
}


