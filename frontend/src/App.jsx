// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css'; // Asegúrate de que apunta a tu archivo CSS principal

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Realiza una petición GET al backend cuando el componente se monta
    // Asegúrate de que la URL y el puerto coincidan con tu backend (ej. http://localhost:5000)
    axios.get('http://localhost:5000/')
      .then(response => {
        setBackendMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setBackendMessage('Error al conectar con el backend. Revisa la consola y el servidor backend.');
      });
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex mb-8">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-24 h-24 mr-4 animate-spin-slow" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-24 h-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">DesarrolloCap</h1>
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Frontend con Vite + React + TailwindCSS</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={() => setCount((count) => count + 1)}
        >
          Contador: {count}
        </button>
        <p className="mt-4 text-gray-700">
          Edita <code>src/App.jsx</code> y guarda para ver cambios en tiempo real.
        </p>
        <h3 className="text-xl font-bold text-green-700 mt-6">Mensaje del Backend:</h3>
        <p className="text-lg text-green-800 font-medium mt-2">{backendMessage}</p>
      </div>
      <p className="read-the-docs text-gray-500 mt-8">
        Haz clic en los logos de Vite y React para aprender más.
      </p>
    </div>
  );
}

export default App;
