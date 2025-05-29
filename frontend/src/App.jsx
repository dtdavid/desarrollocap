import AppRoutes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header y Footer estarán DENTRO del BrowserRouter que está en AppRoutes */}
      <AppRoutes />
    </div>
  );
}

export default App;

