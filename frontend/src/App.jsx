import AppRoutes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import "./App.css";
import Perfil from "./pages/Perfil";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="min-h-dvh w-full flex flex-col bg-celeste ">
      {/* Header y Footer estarán DENTRO del BrowserRouter que está en AppRoutes */}
      <AppRoutes />
    </div>
  
  );
}

export default App;
