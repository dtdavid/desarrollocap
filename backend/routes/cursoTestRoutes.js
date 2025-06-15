import express from 'express';
import { insertarCursoTest } from '../controllers/cursoTestController.js';

const router = express.Router();
router.post('/insertar', insertarCursoTest);

export default router;
