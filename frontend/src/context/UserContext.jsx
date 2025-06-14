import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Estado del usuario general (nombre, email, etc.)
  const [usuario, setUsuario] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  });

  // Estado específico para los cursos comprados (por ID)
  const [cursosComprados, setCursosComprados] = useState(() => {
    const data = localStorage.getItem("cursosComprados");
    return data ? JSON.parse(data) : [];
  });

  // Función para agregar un curso
  const agregarCurso = (cursoId) => {
    if (!cursosComprados.includes(cursoId)) {
      const actualizados = [...cursosComprados, cursoId];
      setCursosComprados(actualizados);
      localStorage.setItem("cursosComprados", JSON.stringify(actualizados));
    }

    // Actualiza el objeto usuario también (opcional)
    if (usuario) {
      const usuarioActualizado = {
        ...usuario,
        cursos: [...new Set([...(usuario.cursos || []), cursoId])],
      };
      setUsuario(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
    }
  };

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        cursosComprados,
        agregarCurso,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UserContext);
}
