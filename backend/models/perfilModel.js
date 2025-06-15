// backend/models/perfilModel.js

import pool from '../db/connection.js';

/**
 * Obtiene los datos del perfil del usuario autenticado (usando ID del token)
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const obtenerPerfilPorId = async (id) => {
  const query = 'SELECT id, nombre, email, rol FROM usuarios WHERE id = $1';
  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
};
