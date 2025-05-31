import { createContext, useState, useContext } from "react";

// Crear contexto
const CarritoContext = createContext();

// Hook personalizado para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (curso) => {
    setCarrito((prev) => [...prev, curso]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((curso) => curso.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
