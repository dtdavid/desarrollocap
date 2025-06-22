import { useEffect, useState } from "react";
import { VscBook,  VscBell, VscVmActive  } from "react-icons/vsc"


const PanelCurso = () => {
 const [curso, setCurso] = useState("");
  const [activo, setActivo] = useState(null);

const toggle = (index) => {
    setActivo(activo === index ? null : index);
  };

  const datos = [
    {
      titulo: "Unidad 1",
      contenido: "Contenido Unidad 1"
    },
    {
      titulo: "Unidad 2",
      contenido: "Contenido Unidad 2"
    },
    {
      titulo: "Unidad 3",
      contenido: "Contenido Unidad 3"
    }
  ];



 useEffect(() => {
    const cursoSeleccionado = localStorage.getItem("cursoSeleccionado");
    if (cursoSeleccionado) {
      setCurso(cursoSeleccionado);
    }
  }, []);

  return (
    <>
    <nav className="bg-blue-600 text-white">
  <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    <a href="#home" className="text-white font-bold text-lg">
      Estas en tu curso <strong>{curso}</strong>
    </a>
    <div className="flex gap-4">
      <a href="#editar" className="flex items-center gap-2 text-white font-bold hover:underline">
        <VscBook t size={24} />
        <span>Cursos</span>
      </a>
      <a href="#cursos" className="flex items-center gap-2 text-white font-bold hover:underline">
        <VscBell size={24} />
        <span>Notificaciones</span>
      </a>
         </div>
  </div>
</nav>

<div className="flex justify-center mt-10">
<a href="#sala" className="flex items-center gap-2 text-pink-400 font-bold border border-blue-500 px-4  py-2 rounded hover:bg-blue-500 hover:text-white transition-colors" >
  <VscVmActive size={32} />
  <span>Ingreso a Sala Virtual</span>
</a>
</div>

<div className="max-w-xl mx-auto mt-10">
      {datos.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded mb-4">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-4 py-3 bg-blue-100 hover:bg-blue-200 font-semibold text-blue-800 flex justify-between items-center"
          >
            {item.titulo}
            <span>{activo === index ? "−" : "+"}</span>
          </button>
          {activo === index && (
            <div className="px-4 py-3 bg-white text-gray-700">
              {item.contenido}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  
  )
}
export default PanelCurso