import AppRoutes from "./routes";
import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-dvh w-full flex flex-col bg-celeste ">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
