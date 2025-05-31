import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Importa los iconos que quieres usar:
import { FaGlobe, FaLaptop, FaCalendarAlt } from "react-icons/fa";

const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    axios.get("/data/cursos.json")
      .then((res) => {
        // Busca el curso con el id que viene por params (convertir a number si necesario)
        const cursoEncontrado = res.data.find(c => c.id === Number(id));
        setCurso(cursoEncontrado);
      })
      .catch((err) => console.error("Error al cargar curso:", err));
  }, [id]);

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-4">{curso.titulo}</h2>
      <img src={curso.imagen} alt={curso.titulo} className="w-full max-h-64 object-contain rounded mb-6" />

      <p className="mb-4">{curso.descripcion}</p>

      <p className="flex items-center gap-2 mb-2">
        <FaGlobe className="text-blue-600" /> {curso.modalidad}
      </p>
      <p className="flex items-center gap-2 mb-2">
        <FaLaptop className="text-green-600" /> {curso.docencia}
      </p>
      <p className="flex items-center gap-2 mb-2">
        <FaCalendarAlt className="text-orange-600" /> {curso.fechaInicio}
      </p>
      <p className="flex items-center gap-2 mb-6">
        <FaCalendarAlt className="text-orange-600" /> {curso.fechaFin}
      </p>

      <p className="text-xl font-semibold">Precio: ${curso.precio.toLocaleString()}</p>
      <p>Duración: {curso.duracion}</p>
      <p>Disponible: {curso.disponible ? "Sí" : "No"}</p>
    </div>
  );
};

export default CursoDetalle;

