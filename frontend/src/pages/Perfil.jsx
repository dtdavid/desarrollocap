import { useEffect, useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import {
  VscAccount,
  VscMortarBoard,
  VscOrganization,
  VscGlobe,
  VscRepo,
  VscCalendar,
} from "react-icons/vsc";
import ImagenCursoReact from "../assets/images/react.png";
import ImagenCursojs from "../assets/images/js.jpg";
import ImagenCursopsql from "../assets/images/psql.png";
import axios from "axios"; //  para hacer peticiones al backend

const Perfil = () => {
  const navigate = useNavigate();

  // estado para guardar la respuesta del backend
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    

    if (!token) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
      return;
    }

// Lista de cursos (solo títulos)
  const cursos = [
    "REACT",
    "FUNDAMENTOS DE JAVA SCRIPT",
    "BASES DE DATOS PSQL"
  ];
// Guardar en localStorage
  localStorage.setItem("listaCursos", JSON.stringify(cursos));


    // Petición al backend para obtener el perfil
    axios
      .get(`http://localhost:5000/api/usuarios/${localStorage.getItem("usuarioId")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPerfil(res.data.usuario); // guardamos usuario desde backend
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        setError("Token inválido o expirado.");
        setLoading(false);
        
      // Limpio token y usuario para evitar que Navbar piense que está logueado
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      });
  }, [navigate]);

  const CursoCard = ({ img, titulo, inicio, termino }) => (
    <div className="flex flex-col border rounded-lg shadow-md overflow-hidden max-w-sm w-full">
      <img src={img} alt={titulo} className="h-48 w-full object-cover" />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-center text-xl mb-2">{titulo}</h3>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscGlobe size={20} />
          <span>e-learning</span>
        </div>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscRepo size={20} />
          <span>Clases Lunes y Miércoles</span>
        </div>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscCalendar size={20} />
          <span>Inicio: {inicio}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <VscCalendar size={20} />
          <span>Término: {termino}</span>
        </div>

        <button
          className="mt-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded transition-colors"
          type="button"
          onClick={() => {
         localStorage.setItem("cursoSeleccionado", titulo);
           navigate("/perfil");
  }}
        >
          Ir al curso
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">
          Bienvenido a tu perfil{perfil ? `, ${perfil.nombre}` : ""}
        </h2>
        <div className="flex gap-6">
          <Link
            to="/perfil/editar"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            <VscAccount size={22} /> Editar mi perfil
          </Link>
          <Link
            to="/perfil/certificados"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            <VscMortarBoard size={22} /> Mis Certificados
          </Link>
          <Link
            to="/comunidad"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            <VscOrganization size={22} /> Comunidad
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 mt-8 mb-12">
        {loading && <p className="text-center font-semibold">Cargando perfil...</p>}
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
        {!loading && perfil && (
          <section className="mb-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Hola, {perfil.nombre}</h3>
            <p>Email: {perfil.email}</p>
            <p>Rol: {perfil.rol}</p>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-8">
          <CursoCard
            img={ImagenCursoReact}
            titulo="REACT"
            inicio="15 mayo 2025"
            termino="15 junio 2025"
          />
          <CursoCard
            img={ImagenCursojs}
            titulo="FUNDAMENTOS DE JAVA SCRIPT"
            inicio="1 mayo 2025"
            termino="1 junio 2025"
          />
          <CursoCard
            img={ImagenCursopsql}
            titulo="BASES DE DATOS PSQL"
            inicio="1 junio 2025"
            termino="30 junio 2025"
          />
        </div>
      </main>
    </>
  );
};

export default Perfil;





