import express from 'express';
import * as evaluacionesController from '../controllers/evaluacionesController.js';

const router = express.Router();

router.get('/', evaluacionesController.getEvaluaciones);
router.get('/:id', evaluacionesController.getEvaluacionPorId);
router.post('/', evaluacionesController.postEvaluacion);
router.put('/:id', evaluacionesController.putEvaluacion);
router.delete('/:id', evaluacionesController.deleteEvaluacion);

export default router;
