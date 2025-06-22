import express from 'express';
import { verificarToken } from '../middlewares/verificarToken.js';
import * as mensajesController from '../controllers/mensajesController.js';

const router = express.Router();

// Rutas que requieren token
router.use(verificarToken);

// Obtener todos los mensajes del usuario autenticado
router.get('/', mensajesController.getMensajesPropios);

// Obtener conversación con otro usuario
//router.get('/:otroId', mensajesController.getMensajes);
router.get('/usuario/:otroId', mensajesController.getMensajes);

// Enviar mensaje
router.post('/', mensajesController.postMensaje);

// Marcar mensaje como leído
router.patch('/:id/leido', mensajesController.patchMensajesLeido);

export default router;
