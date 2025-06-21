// backend/controllers/usuariosController.js

import { 
  obtenerTodosUsuarios,
  contarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarios } from '../models/usuarioModel.js';

/**
 * Controlador para obtener un usuario por su ID (público)
 * Ruta: GET /api/usuarios/:id
 */
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado",
        details: { userId: id }
      });
    }

    res.json({
  success: true,
  data: usuario
});
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      error: "Error al obtener usuario",
      details: process.env.NODE_ENV === 'development' ? { error: error.message } : null
    });
  }
};

export const buscarUsuariosController = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Parámetro de búsqueda requerido' });
    }
    
    const usuarios = await buscarUsuarios(query);
    res.json(usuarios);
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAllUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [usuarios, total] = await Promise.all([
      obtenerTodosUsuarios(limit, offset),
      contarUsuarios()
    ]);

    res.json({
      success: true,
      data: usuarios,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor'
    });
  }
};



