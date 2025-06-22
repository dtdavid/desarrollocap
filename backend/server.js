// backend/server.js
import { verificarToken, isAdmin } from './middlewares/verificarToken.js';
import "dotenv/config";
import express from "express";
import cors from "cors";

// Import routes
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

// Database connection
import pool from "./db/connection.js";

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Successful PostgreSQL connection:", res.rows[0]);
  }
});

const app = express();

// Deployment configuration
const PORT = process.env.PORT || 5000;
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";

// Enhanced CORS configuration
const allowedOrigins = [
  'https://desarrollocap.onrender.com',
  'http://desarrollocap.onrender.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin && process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Public routes
app.use("/api/auth", loginRoutes);
app.use("/api/auth", registerRoutes);
app.use("/api/test/cursos", cursoTestRoutes);

// Protected routes (require authentication)
app.use(verificarToken);
app.use("/api/perfil", perfilRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/recursos", recursosRoutes);
app.use("/api/evaluaciones", evaluacionesRoutes);
app.use("/api/mensajes", mensajesRoutes);

// Admin-only routes (require admin role)
app.use("/api/admin", isAdmin, adminRoutes);

// Health check endpoint
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({
      status: "healthy",
      message: "Backend is running",
      dbTime: result.rows[0].current_time,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
    res.status(500).json({ 
      status: "error",
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    status: "error",
    error: "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// Start server
app.listen(PORT, host, () => {
  console.log(`Server running on http://${host}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

export default app;