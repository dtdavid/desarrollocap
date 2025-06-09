import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaUser, FaShoppingCart, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // ✅ importante
import logo from "../assets/images/logo.png";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext); // ✅ ahora dinámico

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
        {!isAuthenticated && (
          <Link to="/login">
            <FaUser size={20} />
          </Link>
        )}
        <Link to="/carrito">
          <FaShoppingCart size={20} />
        </Link>
      </div>
    </header>
  );
}
