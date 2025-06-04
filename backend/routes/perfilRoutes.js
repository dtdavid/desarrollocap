import express from "express";
import { verificarToken } from "../middlewares/verificarToken.js"; // Protege la ruta

const router = express.Router();

// Ruta GET: /api/perfil
router.get("/", verificarToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado al perfil",
    usuario: req.user, // Contiene id y rol gracias al middleware
  });
});

export default router;
