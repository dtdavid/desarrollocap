// backend/controllers/perfilController.js

import { obtenerPerfilPorId } from '../models/perfilModel.js';

/**
 * Controlador para obtener el perfil del usuario autenticado
 * Ruta: GET /api/perfil
 */
export const getPerfilUsuario = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const perfil = await obtenerPerfilPorId(usuarioId);

    if (!perfil) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Acceso autorizado al perfil',
      usuario: perfil,
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
