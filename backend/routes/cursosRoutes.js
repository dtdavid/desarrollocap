// routes/cursosRoutes.js
import express from 'express';
import {
  getCursos,
  getCursoById,
  postCurso,
  putCurso,
  deleteCurso
} from '../controllers/cursosController.js';

const router = express.Router();

router.get('/', getCursos);
router.get('/:id', getCursoById);
router.post('/', postCurso);
router.put('/:id', putCurso);
router.delete('/:id', deleteCurso);

export default router;

