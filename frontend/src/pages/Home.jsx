import React from "react";
import CursosTipo from "./CursosTipo";
import fondoHeader from "../assets/images/CaPacitaciones OTEC.png";
/* src/index.css o src/styles/index.css */
import "../styles/colors.css";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="flex flex-col-reverse md:flex-row h-auto md:h-[850px]">
        {/* Imagen a la izquierda (en escritorio) */}
        <div
          className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(${fondoHeader})`,
          }}
        ></div>

        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center p-8 md:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Bienvenido a DesarrolloCap
          </h1>
          <p className="text-lg md:text-xl max-w-md">
            Descubre cursos diseñados para potenciar tu crecimiento profesional.
            Aprende, mejora y avanza.
          </p>
        </div>
      </section>

      {/* Cursos */}
      <section className="bg-azul-claro w-full py-10 text-4xl sm:text-4xl text-center">
        <h3>Tenemos los siguientes cursos para ti</h3>
      </section>

      <CursosTipo />
    </main>
  );
};

export default Home;
