import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (!token || !usuario) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
    } else {
      setNombre(usuario.nombre);
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Hola {nombre}, bienvenido a tu perfil
      </h1>
    </div>
  );
};

export default Perfil;


