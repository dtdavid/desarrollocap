import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/perfil");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-4 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Iniciar Sesión
      </button>
    </form>
  );
}

export default Login;

