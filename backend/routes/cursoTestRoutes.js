//routes/cursoTestRoutes.js
import express from 'express';
import { 
  insertarCursoTest,
  migrarCursos,
  resetCursos 
} from '../controllers/cursoTestController.js';

const router = express.Router();

// Solo disponible en desarrollo
if (process.env.NODE_ENV === 'development') {
  router.post('/insertar', insertarCursoTest); // Inserta 1 curso demo
  router.post('/migrar', migrarCursos);       // Inserta múltiples cursos
  router.delete('/reset', resetCursos);       // Elimina todos los cursos
} else {
  router.use((req, res) => res.status(403).json({ 
    success: false,
    error: 'Acceso denegado en producción' 
  }));
}

export default router;
