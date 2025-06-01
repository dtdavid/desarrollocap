import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CursosTipo = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    axios
      .get("/data/cursos.json")
      .then((res) => setCursos(res.data))
      .catch((err) => console.error("Error al cargar cursos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-azul-claro min-h-dvh place-items-center">
      {cursos.map((curso) => (
        <section
          key={curso.id}
          className="cursoCard bg-white rounded-xl shadow-md p-4 w-full h-full max-w-xs sm:max-w-sm lg:max-w-md min-h-[400px] flex flex-col justify-between space-y-4"
        >
          <header className="cursoCard-header flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={curso.imagen}
              alt={curso.titulo}
              className="cursoCard-imagen w-52 h-32 object-contain rounded"
            />
            <h3 className="cursoCard-titulo text-xl font-semibold text-gray-800">
              {curso.titulo}
            </h3>
          </header>

          <article className="cursoCard-article">
            <p className="cursoCard-descripcion text-gray-700">
              {curso.descripcion}
            </p>
          </article>

          <footer className="cursoCard-footer flex justify-between pt-4">
            <button
              onClick={() => navigate(`/curso/${curso.id}`)} // sustituye ID por dinámico si hace falta
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Leer más
            </button>
            {/* <button
              onClick={() => navigate(`/carrito/${curso.id}`)} // sustituye ID por dinámico si hace falta
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            > Pagar</button> */}
          </footer>
        </section>
      ))}
    </div>
  );
};

export default CursosTipo;
