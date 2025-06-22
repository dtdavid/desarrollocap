import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
// import logo from "../assets/images/logo.png";
import logo from "/images/logo.png";

export default function Header() {
  const navigate = useNavigate();

  // Recuperamos usuario
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Logo OTEC"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-blue-500" /> +56 9 1234 5678
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope className="text-blue-500" /> contacto@otec.cl
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link to="/login">
              <FaUser size={20} />
            </Link>
          </>
        )}
        <Link to="/carrito">
          <FaShoppingCart size={20} />
        </Link>

        {user && (
          <button
            onClick={handleLogout}
            className="relative group p-1 rounded hover:bg-red-600 transition-colors"
            aria-label="Cerrar sesión"
          >
            <FiLogOut size={20} className="text-black" />
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
      </div>
    </header>
  );
}
