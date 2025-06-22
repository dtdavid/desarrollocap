import { createContext, useState, useContext } from "react";

// Crear contexto
const CarritoContext = createContext();

// Hook personalizado para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (curso) => {
    // verifica si el curso ya esta en el carrito
    const cursoRepetido = carrito.find ((item)=>item.id === curso.id)
    if (cursoRepetido){
      //si el curso ya está en el carrito, incrementa el count
      setCarrito ((prevCarrito)=> 
        prevCarrito.map ((item)=>
        item.id === curso.id ? {...item, count:item.count +1}: item)
    )
    }
    else {
      // si el curso no está en el carrito, agregalo con count=1
    setCarrito((prevCarrito) => [...prevCarrito, {...curso, count:1}]);
  }
}

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((curso) => curso.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const incrementarCantidad = (id) => {
  setCarrito(prev =>
    prev.map(curso =>
      curso.id === id ? { ...curso, count: curso.count + 1 } : curso
    )
  );
};

const disminuirCantidad = (id) => {
  setCarrito(prev =>
    prev.map(curso =>
      curso.id === id && curso.count > 1
        ? { ...curso, count: curso.count - 1 }
        : curso
    )
  );
};

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, incrementarCantidad, disminuirCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext