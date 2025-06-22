// routes/cursosRoutes.js
import express from 'express';
import { verificarToken, isAdmin } from '../middlewares/verificarToken.js';
import {
  getCursos,
  getCursoById,
  postCurso,
  putCurso,
  deleteCurso
} from '../controllers/cursosController.js';

const router = express.Router();

// Rutas públicas
router.get('/', getCursos);
router.get('/:id', getCursoById);

// Rutas protegidas
router.post('/', verificarToken, isAdmin, postCurso);
router.put('/:id', verificarToken, isAdmin, putCurso);
router.delete('/:id', verificarToken, isAdmin, deleteCurso);

export default router;

