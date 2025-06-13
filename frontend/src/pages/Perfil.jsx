// Ajuste en Perfil.jsx para mostrar los cursos comprados dinámicamente
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../context/UserContext.jsx";
import {
  VscAccount,
  VscMortarBoard,
  VscOrganization,
  VscGlobe,
  VscRepo,
  VscCalendar,
} from "react-icons/vsc";
import fondoHeader from "../assets/images/textura_azul_oscuro.png";

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, cursosComprados } = useUsuario();
  const [todosLosCursos, setTodosLosCursos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
      return;
    }

    fetch("data/cursos.json")
      .then((res) => res.json())
      .then((data) => setTodosLosCursos(data))
      .catch((err) => console.error("Error cargando cursos:", err));
  }, [navigate]);

  const CursoCard = ({ curso }) => (
    <div className="flex flex-col border rounded-lg shadow-md overflow-hidden max-w-sm w-full">
      <img
        src={curso.imagen}
        alt={curso.titulo}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-center text-xl mb-2">{curso.titulo}</h3>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscGlobe size={20} />
          <span>{curso.modalidad}</span>
        </div>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscRepo size={20} />
          <span>{curso.docencia}</span>
        </div>

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <VscCalendar size={20} />
          <span>Inicio: {curso.fechaInicio}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <VscCalendar size={20} />
          <span>Término: {curso.fechaFin}</span>
        </div>

        <button
          className="mt-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded transition-colors"
          type="button"
          onClick={() => {
            localStorage.setItem("cursoSeleccionado", curso.titulo);
            navigate("/perfil/curso");
          }}
        >
          Ir al curso
        </button>
      </div>
    </div>
  );

  const cursosDelUsuario = todosLosCursos.filter((c) =>
    cursosComprados.includes(c.id)
  );

  return (
    <>
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">
          Bienvenido a tu perfil{usuario ? `, ${usuario.nombre}` : ""}
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

      <div className="relative max-w-4xl mx-auto text-center z-0 pt-0 ">
        <h1 className="text-3xl sm:text-3xl font-bold mb-4 z-0 pt-10">
          Mis Cursos:
        </h1>
      </div>

      <main className="container mx-auto px-4 mt-8 mb-12">
        {!usuario ? (
          <p className="text-center font-semibold">Cargando perfil...</p>
        ) : (
          <>
            <section className="mb-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">
                Hola, {usuario.nombre}
              </h3>
              <p>Email: {usuario.email}</p>
              <p>Rol: {usuario.rol}</p>
            </section>

            {cursosDelUsuario.length === 0 ? (
              <p className="text-center">Aún no has comprado cursos.</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-8">
                {cursosDelUsuario.map((curso) => (
                  <CursoCard key={curso.id} curso={curso} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Perfil;
