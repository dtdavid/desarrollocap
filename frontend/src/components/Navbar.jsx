import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // ícono de logout

export default function Navbar() {
  const navigate = useNavigate();

  // Recuperamos el usuario desde localStorage
  const token = localStorage.getItem("token");
  // Si hay token, asumimos que el usuario está logueado
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-azul_oscuro text-white p-2 flex justify-between px-4">
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="font-semibold">Hola, {user.nombre}</span>
            <Link to="/perfil" className="hover:underline">
              Mi perfil
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:underline">
              Inicio
            </Link>
            <Link to="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="hover:underline">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
