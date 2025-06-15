// backend/controllers/usuariosController.js

import { buscarUsuarioPorId } from '../models/usuarioModel.js';

/**
 * Controlador para obtener un usuario por su ID (público)
 * Ruta: GET /api/usuarios/:id
 */
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

