import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Debes completar ambos campos.");
      return;
    }

    setIsLoading(true); // Mostrar spinner

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("savedEmail", email);

      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("rol", payload.rol);
      localStorage.setItem("usuarioId", payload.id);

      const perfilResponse = await axios.get(
        `http://localhost:5000/api/usuarios/${payload.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("user", JSON.stringify(perfilResponse.data));

      navigate("/perfil");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas o error en el servidor");
    } finally {
      setIsLoading(false); // Ocultar spinner
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      {/* Animación de carga */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        autoComplete="on"
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm z-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          autoComplete="current-password"
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
