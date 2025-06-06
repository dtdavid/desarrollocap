import { GoClock } from "react-icons/go";
import ImagenCurso from '../assets/images/js.jpg'

const Certificados = () => {
  
  return (
    <div className="flex flex-col border rounded-lg shadow-md overflow-hidden max-w-sm w-full">
          <img src={ImagenCurso} alt='imagen-curso' className="h-48 w-full object-cover" />
          <div className="flex flex-col flex-grow p-4">
            <h3 className="font-bold text-center text-xl mb-2">FUNDAMENTOS DE JAVA SCRIPT</h3>
    
            <div className="flex items-center gap-2 mb-1 text-gray-700">
              <GoClock size={20} />
              <span>Cantidad de horas: 70 horas </span>
            </div>
            </div>
   <a
        href="/images/certificado.png"
        download
        className="mt-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded transition-colors text-center px-4"
      >
        Descargar Certificado
      </a>

            </div>
  )
}

export default Certificados