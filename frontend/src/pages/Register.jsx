import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // se guarda el nuevo usuario en localStorage o hacer una petición a tu API
    const nuevoUsuario = {
      nombre,
      email,
      password,
      token: Date.now().toString(), // token falso solo para prueba
    };

    // de momento guardamos en localStorage
    localStorage.setItem("token", nuevoUsuario.token);
    localStorage.setItem("user", JSON.stringify(nuevoUsuario));

    navigate("/perfil");
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
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

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;

