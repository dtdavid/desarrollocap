import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1 className="text-xl font-bold">Bienvenido a tu perfil</h1>
      {/* contenido del perfil */}
    </div>
  );
};

export default Perfil;

