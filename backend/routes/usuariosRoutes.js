// routes/usuariosRoutes.js
import express from 'express';
import { getUsuarioById } from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta GET para usuario/:id
router.get('/:id', getUsuarioById);

export default router;