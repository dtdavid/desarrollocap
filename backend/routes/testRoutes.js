// backend/routes/testRoutes.js
import express from "express";
import pool from "../db/connection.js"; // asegúrate que la ruta sea correcta

const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      ok: true,
      hora: result.rows[0].now,
      mensaje: "✅ Conexión exitosa con PostgreSQL",
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

export default router;
