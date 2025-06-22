// routes/cursosRoutes.js
import express from 'express';
import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  insertarCursoTest,
  resetCursos
} from '../controllers/cursosController.js';

const router = express.Router();

// Rutas principales
router.get('/', getCursos);
router.get('/:id', getCursoById);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

// Rutas de testing (solo desarrollo)
router.post('/test/insertar', insertarCursoTest);
router.delete('/test/reset', resetCursos);

export default router;
