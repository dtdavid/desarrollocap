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

/**
 * Busca usuarios por nombre, email o apellido
 * @param {string} query - Término de búsqueda
 * @param {number} [limit=20] - Límite de resultados
 * @returns {Promise<Array>}
 */
export const buscarUsuarios = async (query, limit = 20) => {
  const searchQuery = `
    SELECT id, nombre, apellido, email, rol 
    FROM usuarios 
    WHERE 
      nombre ILIKE $1 OR 
      apellido ILIKE $1 OR 
      email ILIKE $1
    LIMIT $2
  `;
  const result = await pool.query(searchQuery, [`%${query}%`, limit]);
  return result.rows;
};
/**
 * Obtiene todos los usuarios (con paginación)
 */
export const obtenerTodosUsuarios = async (limit = 20, offset = 0) => {
  const query = `
    SELECT id, nombre, apellido, email, rol, activo, fecha_registro
    FROM usuarios
    ORDER BY fecha_registro DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
};

/**
 * Obtiene el conteo total de usuarios
 */
export const contarUsuarios = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM usuarios');
  return parseInt(result.rows[0].count);
};