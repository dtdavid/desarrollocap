import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/images/logo2.png";
import texto_logo from "../assets/images/text_logo_otecpng.png";
import perfilDefault from "../assets/images/foto_perfil_ejemplo.png";

export default function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo + Contacto */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Logo OTEC"
            className="w-12 h-11 rounded-full object-cover border-4 border-azul_base"
          />
        </Link>
        <img
          src={texto_logo}
          alt="Logo OTEC2"
          className="w-120 h-11 object-cover"
        />
      </div>

      {/* Íconos de sesión y carrito */}
      <div className="flex items-center gap-4">
        {!user && (
          <Link to="/login">
            <FaUser
              size={20}
              className="text-blue-500 hover:text-gray-500  transition-colors"
            />
          </Link>
        )}

        <Link to="/carrito">
          <FaShoppingCart
            size={20}
            className="text-blue-500 hover:text-gray-500  transition-colors"
          />
        </Link>

        {/* Si hay usuario logueado: mostrar imagen + logout */}
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={
                user.imagen?.startsWith("data:") ||
                user.imagen?.startsWith("http")
                  ? user.imagen
                  : user.imagen
                  ? `http://localhost:5000/uploads/perfiles/${user.imagen}`
                  : perfilDefault
              }
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />

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
          </div>
        )}
      </div>
    </header>
  );
}
