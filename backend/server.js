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

//cambios después del Deploy en Render
const PORT = process.env.PORT || 5000;
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";


// 1. Configuración CORS dinámica 
const allowedOrigins = [
  'https://desarrollocap.onrender.com',
  'http://desarrollocap.onrender.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Permite peticiones sin origen (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.error(`Origen bloqueado por CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// app.use(cors({
//   origin: function (origin, callback) {
//     // Permite peticiones sin origen solo en desarrollo
//     if (!origin && process.env.NODE_ENV === 'development') {
//       return callback(null, true);
//     }
    
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error(`Origen bloqueado por CORS: ${origin}`);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});


// Middleware para parsear JSON
app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}); 

// Rutas del sistema
app.use("/api/auth", loginRoutes); // /api/auth/login
app.use("/api/auth", registerRoutes); // /api/auth/register
app.use("/api/test/cursos", cursoTestRoutes);

// Middleware de autenticación (protege las rutas siguientes)
app.use(verificarToken);
app.use("/api/perfil", perfilRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/recursos", recursosRoutes);
app.use("/api/evaluaciones", evaluacionesRoutes);
app.use("/api/mensajes", mensajesRoutes);
app.use("/api/admin", isAdmin, adminRoutes); // Solo admin

// Ruta de prueba (sin autenticación)
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({
      message: "Backend de DesarrolloCap funcionando correctamente.",
      dbTime: result.rows[0].current_time,
    });
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Iniciar el servidor
app.listen(PORT, host, () => {
  console.log(`Servidor corriendo en http://${host}:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Orígenes permitidos: ${allowedOrigins.join(', ')}`);
});

export default app;