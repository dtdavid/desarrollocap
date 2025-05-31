import React from "react";
import CursosTipo from "./CursosTipo";
import fondoHeader from "../assets/images/homepage_idea2.jpg";
/* src/index.css o src/styles/index.css */
import "../styles/colors.css";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Sección con imagen de fondo */}
      <section
        className="relative h-[600px] bg-cover bg-center bg-no-repeat text-white px-4"
        style={{
          backgroundImage: `url(${fondoHeader})`,
        }}
      >
        {/* Capa azul translúcida con desenfoque */}
        <div className="absolute inset-0 bg-blue-900/60 "></div>

        {/* Contenido encima del overlay */}
        <div className="relative max-w-4xl mx-auto text-center z-10 pt-16 ">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 ">
            Bienvenido a DesarrolloCap
          </h1>
          <p className="text-lg sm:text-xl ">
            Descubre cursos diseñados para tu crecimiento profesional. Aprende,
            mejora y avanza.
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
