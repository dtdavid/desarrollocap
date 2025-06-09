import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // Obtén la función login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("token", token);

      // Decodificar el payload (opcional) para extraer el rol
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("rol", payload.rol);
      localStorage.setItem("usuarioId", payload.id);

      const perfilResponse = await axios.get(
        `http://localhost:5000/api/usuarios/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(perfilResponse.data));

      login(); // <-- Aquí actualizas el estado global de autenticación

      navigate("/"); // Navega al inicio o perfil
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas o error en el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Iniciar Sesión
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
