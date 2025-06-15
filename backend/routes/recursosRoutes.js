import express from 'express';
import * as recursosController from '../controllers/recursosController.js';

const router = express.Router();

router.get('/', recursosController.getRecursos);
router.get('/:id', recursosController.getRecursoPorId);
router.post('/', recursosController.postRecurso);
router.put('/:id', recursosController.putRecurso);
router.delete('/:id', recursosController.deleteRecurso);

export default router;
