import { useEffect, useState } from "react";
import axios from "axios";
import CardCurso from "../components/CardCurso";

export default function Home() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    axios
      .get("/data/cursos.json")
      .then((response) => setCursos(response.data))
      .catch((error) => console.error("Error cargando cursos:", error));
  }, []);

  return (
    <>
      <main className="p-4 flex flex-col gap-4">
        {cursos.map((curso) => (
          <CardCurso key={curso.id} curso={curso} />
        ))}
      </main>
    </>
  );
}

