import { useEffect } from "react";
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

const Perfil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (!token || !usuario) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
    }
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
        >
          Ir al curso
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Bienvenido a tu perfil</h2>
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



