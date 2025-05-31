import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaGlobe, FaLaptop, FaCalendarAlt } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";

const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios
      .get("/data/cursos.json")
      .then((res) => {
        const cursoEncontrado = res.data.find((c) => c.id === Number(id));
        setCurso(cursoEncontrado);
      })
      .catch((err) => console.error("Error al cargar curso:", err));
  }, [id]);

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-4">{curso.titulo}</h2>
      <img
        src={curso.imagen}
        alt={curso.titulo}
        className="w-full max-h-64 object-contain rounded mb-6"
      />

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

      <p className="text-xl font-semibold">
        Precio: ${curso.precio.toLocaleString()}
      </p>
      <p>Duración: {curso.duracion}</p>
      <p>Disponible: {curso.disponible ? "Sí" : "No"}</p>

      {/* 👉 Botón de Agregar al carrito */}
      <button
        onClick={() => {
          agregarAlCarrito(curso);
          alert("✅ Curso añadido al carrito correctamente");
        }}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default CursoDetalle;
