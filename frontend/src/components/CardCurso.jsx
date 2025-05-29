import { Link } from "react-router-dom";

export default function CardCurso({ curso }) {
 return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link to={`/curso/${curso.id}`} className="block">
        <img 
          src={curso.imagen} 
          alt={curso.titulo} 
          className="w-full h-40 object-cover rounded mb-2" 
        />
        <h2 className="text-xl font-semibold">{curso.titulo}</h2>
        <p className="text-gray-600 text-sm mt-1">{curso.descripcion}</p>
        <p className="text-blue-600 font-bold mt-2">${curso.precio.toLocaleString('es-CL')}</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
          {curso.categoria}
        </span>
      </Link>
    </div>
  );
}
