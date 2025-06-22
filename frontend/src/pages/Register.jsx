import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    rol: "estudiante"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Reset form when component mounts
  useEffect(() => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
      rol: "estudiante"
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.apellido) newErrors.apellido = "Apellido es requerido";
    if (!formData.email) {
      newErrors.email = "Email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no es válido";
    }
    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial";
    }
    if (formData.password !== formData.password2) {
      newErrors.password2 = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { data } = await API.post("/auth/register", {
        ...formData,
        email: formData.email.toLowerCase()
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario));
      
      navigate("/perfil", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Error en el servidor";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.error || "Datos inválidos";
          if (error.response.data.error === "El email ya está registrado") {
            setErrors(prev => ({ ...prev, email: errorMessage }));
          }
        } else if (error.response.status === 401) {
          errorMessage = "No autorizado - verifica tus credenciales";
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Registro</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tu nombre"
          />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tu apellido"
          />
          {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="tu@email.com"
            autoComplete="username"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="rol">Rol</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            {process.env.NODE_ENV === 'development' && (
              <option value="administrador">Administrador</option>
            )}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Crea una contraseña"
            autoComplete="new-password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password2">Confirmar Contraseña</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${errors.password2 ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
          {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

export default Register;


