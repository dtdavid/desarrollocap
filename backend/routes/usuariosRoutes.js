// routes/usuariosRoutes.js
import express from 'express';
import { getUsuarioById, buscarUsuariosController } from '../controllers/usuariosController.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = express.Router();

// Ruta GET para usuario/:id "Autenticados"
router.get('/:id',verificarToken, getUsuarioById);

// Ruta GET para búsqueda general de usuarios
router.get('/buscar', verificarToken, buscarUsuariosController);

export default router;