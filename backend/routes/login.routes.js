import express from "express";
import { verificarToken } from "../middlewares/verificarToken.js"; // ajusta el path si es necesario

const router = express.Router();

router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado al perfil",
    usuario: req.user, // incluye id y rol del token
  });
});

export default router;
