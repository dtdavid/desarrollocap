// backend/models/usuarioModel.js
import pool from '../db/connection.js';

/**
 * Obtiene los datos de un usuario por su ID (para uso público)
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const buscarUsuarioPorId = async (id) => {
  const query = 'SELECT id, nombre, email, rol FROM usuarios WHERE id = $1';
  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
};
