import * as mensajesModel from '../models/mensajesModel.js';

/**
 * GET /api/mensajes/:conversacionId
 * Obtiene mensajes entre el usuario autenticado y otro usuario
 */
export const getMensajes = async (req, res) => {
  const { otroId } = req.params;
  const { id: usuarioId } = req.user; // desde middleware verificarToken
  const mensajes = await mensajesModel.obtenerMensajes(usuarioId, otroId);
  res.json(mensajes);
};
/**
 * GET /api/mensajes
 * Obtiene todos los mensajes relacionados al usuario autenticado
 */
export const getMensajesPropios = async (req, res) => {
  const { id: usuarioId } = req.user;
  console.log('Usuario autenticado:', usuarioId);
  const mensajes = await mensajesModel.obtenerMensajesDeUsuario(usuarioId);
  res.json(mensajes);
};

/**
 * POST /api/mensajes
 * Crea un mensaje nuevo
 */
export const postMensaje = async (req, res) => {
  const { id: remitente_id } = req.user;
  const { destinatario_id, contenido } = req.body;
  const nuevo = await mensajesModel.crearMensaje({ remitente_id, destinatario_id, contenido });
  res.status(201).json(nuevo);
};

/**
 * PATCH /api/mensajes/:id/leido
 * Marca un mensaje como leído
 */
export const patchMensajesLeido = async (req, res) => {
  const { id } = req.params;
  const updated = await mensajesModel.marcarLeido(id);
  if (updated) return res.json({ mensaje: 'Mensaje marcado como leído' });
  res.status(404).json({ error: 'No encontrado' });
};
