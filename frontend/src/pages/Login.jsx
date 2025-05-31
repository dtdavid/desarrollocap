import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/data/usuarios.json")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Error cargando usuarios:", error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

