// routes/authRoutes.js
import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Ruta POST para login: /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post("/register", register);

export default router;

