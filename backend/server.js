// backend/server.js
import { verificarToken, isAdmin } from './middlewares/verificarToken.js';
import "dotenv/config"; // Cargar variables de entorno desde .env
import express from "express";
import cors from "cors";

// Importamos las rutas
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import cursoTestRoutes from "./routes/cursoTestRoutes.js";
import cursosRoutes from "./routes/cursosRoutes.js";
import inscripcionesRoutes from "./routes/inscripcionesRoutes.js";
import recursosRoutes from "./routes/recursosRoutes.js";
import evaluacionesRoutes from "./routes/evaluacionesRoutes.js";
import mensajesRoutes from "./routes/mensajesRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

// Importamos la conexión a la base de datos
import pool from "./db/connection.js";

// Verificamos la conexión a la base de datos al iniciar el servidor
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a PostgreSQL:", res.rows[0]);
  }
});

const app = express();
// Bloque de seguridad para rutas de test (solo desarrollo)
if (process.env.NODE_ENV === 'production') {
  app.use('/api/test', (req, res) => res.status(403).json({
    success: false,
    error: 'Acceso prohibido en producción'
  }));
}
const PORT = process.env.PORT || 5000;
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";
//CORS: en desarrollo, permite conexión solo desde localhost:3000
//CORS: en producción, permite conexión solo desde el frontend
const frontendUrl = process.env.NODE_ENV === 'production' 
  ? 'https://desarrollocap.onrender.com' 
  : 'http://localhost:3000';

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas del sistema
app.use("/api/auth", loginRoutes); // /api/auth/login
app.use("/api/auth", registerRoutes); // /api/auth/register
app.use("/api/test/cursos", cursoTestRoutes);

app.use(verificarToken); // Middleware para verificar token en todas las rutas siguientes
app.use("/api/perfil", perfilRoutes); // /api/perfil
app.use("/api/usuarios", usuariosRoutes); // /api/usuarios
app.use("/api/cursos", cursosRoutes); // /api/cursos
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/recursos", recursosRoutes);
app.use("/api/evaluaciones", evaluacionesRoutes);
app.use("/api/mensajes", mensajesRoutes);
app.use("/api/admin", adminRoutes);

// Ruta de prueba
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({
      message: "✅ Backend de DesarrolloCap funcionando correctamente.",
      dbTime: result.rows[0].current_time,
    });
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Iniciar el servidor
app.listen(PORT, host, () => {
  console.log(`Servidor corriendo en http://${host}:${PORT}`);
});

export default app;
