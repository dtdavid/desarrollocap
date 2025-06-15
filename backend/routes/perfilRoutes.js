// routes/perfilRoutes.js
import express from "express";
import { verificarToken } from "../middlewares/verificarToken.js";
import { getPerfilUsuario } from "../controllers/perfilController.js";

const router = express.Router();

router.get("/", verificarToken, getPerfilUsuario); // GET /api/perfil

export default router;

