import { BiSolidContact } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
// import LogoDesarrolloCap from "../assets/images/logo2.png";
import LogoDesarrolloCap from "/images/logo2.png"; 
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-azul_oscuro text-gray-100 px-6 py-8 text-sm border-t border-blue-300 shadow-inner">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 max-w-7xl mx-auto">
        {/* Logo y Nombre */}
        <div className="flex flex-col items-center md:items-center md:w-1/3 space-y-2 text-center md:text-center">
          <img
            src={LogoDesarrolloCap}
            alt="Logo DesarrolloCap"
            className="w-15 h-12 rounded-full object-cover border-1 border-azul_base"
          />
          <p className="text-sm text-gray-300 font-semibold">
            DesarrolloCap Ltda.
          </p>
        </div>

        {/* Información de Contacto */}
        <div className="md:w-1/3 w-full flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <BiSolidContact /> Contáctanos
          </h3>
          <div className="space-y-1 text-sm text-gray-200">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-blue-200" /> +56 9 1234 5678
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-blue-200" /> contacto@otec.cl
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-blue-200" /> Av. Siempre Viva 123,
              Santiago
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaClock className="text-blue-200" /> Lun a Vie: 9:00 - 18:00 hrs
            </p>
          </div>

          {/* Redes Sociales */}
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <a
              href="https://www.facebook.com/desarrollocapltda"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              aria-label="Facebook"
              className="hover:text-blue-300 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/desarrollocapltda2025/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              aria-label="Instagram"
              className="hover:text-pink-300 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Enlaces legales */}
        <div className="md:w-1/3 w-full flex flex-col items-center md:items-end text-center md:text-right space-y-2">
          <p className="font-semibold text-white">Enlaces útiles</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/quienes-somos" className="hover:underline">
                Quiénes somos
              </a>
            </li>
            <li>
              <a href="/terminos" className="hover:underline">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/privacidad" className="hover:underline">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="/mapa" className="hover:underline">
                Mapa del sitio
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 border-t border-blue-200 pt-4 text-center text-xs text-gray-300">
        &copy; {currentYear} DesarrolloCap Ltda. Todos los derechos reservados.
      </div>
    </footer>
  );
}
