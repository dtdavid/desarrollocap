import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rol, setRol] = useState("estudiante");

  const navigate = useNavigate();

  const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !email || !password || !password2) {
      return alert("Por favor completa todos los campos.");
    }

    if (!validatePassword(password)) {
      return alert("La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial");
    }

    if (password !== password2) {
      return alert("Las contraseñas no coinciden.");
    }

    try {
      const res = await API.post("/auth/register", {
        nombre,
        apellido,
        email,
        password,
        password2,
        rol,
      },
      {
    withCredentials: true,
      }
    );

      const { token, usuario } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      navigate("/perfil");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert(error.response?.data?.mensaje || "Error en el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          {process.env.NODE_ENV === 'development' && ( // process.env.NODE_ENV define el entorno y solo aparece en desarrollo
          <option value="administrador">Administrador</option>
        )}
        </select>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;


