import express from 'express';
import { verificarToken, isAdmin } from '../middlewares/verificarToken.js';
const router = express.Router();

// Ejemplo de ruta solo para admin
router.get('/dashboard', verificarToken, isAdmin, (req, res) => {
  res.json({ message: 'Panel de administración' });
});

export default router;