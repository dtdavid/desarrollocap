import { BiSolidContact } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import LogoDesarrolloCap from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#1D61AD] p-4 text-center text-sm text-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="md:w-1/3 w-full flex justify-center md:justify-start">
          <img
            src={LogoDesarrolloCap}
            alt="Logo DesarrolloCap"
            className="w-16"
          />
        </div>

        {/* Contacto y Redes */}
        <div className="md:w-1/3 w-full text-white text-center font-bold">
          <p className="flex flex-wrap items-center justify-center gap-2 text-base">
            <BiSolidContact />
            Contacto |
            <a
              href="https://www.facebook.com/desarrollocapltda"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/desarrollocapltda2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors duration-200"
            >
              <FaInstagram />
            </a>
            | Quiénes somos
          </p>
        </div>

        {/* Espacio vacío o futura expansión */}
        <div className="md:w-1/3 w-full" />
      </div>
    </footer>
  );
}
