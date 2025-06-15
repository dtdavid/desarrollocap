import { Router } from 'express';
import {
  getInscripciones,
  getInscripcion,
  postInscripcion,
  putInscripcion,
  deleteInscripcion
} from '../controllers/inscripcionesController.js';

const router = Router();

router.get('/', getInscripciones);
router.get('/:id', getInscripcion);
router.post('/', postInscripcion);
router.put('/:id', putInscripcion);
router.delete('/:id', deleteInscripcion);

export default router;
