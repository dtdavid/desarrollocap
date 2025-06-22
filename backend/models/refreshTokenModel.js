import pool from '../db/connection.js';

/**
 * Crea un nuevo refresh token en la base de datos
 */
export const crearRefreshToken = async (usuarioId, token) => {
  const query = `
    INSERT INTO refresh_tokens (usuario_id, token)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await pool.query(query, [usuarioId, token]);
  return result.rows[0];
};

/**
 * Verifica si un refresh token existe
 */
export const verificarRefreshToken = async (token) => {
  const query = `
    SELECT rt.*, u.rol
    FROM refresh_tokens rt
    JOIN usuarios u ON rt.usuario_id = u.id
    WHERE rt.token = $1
  `;
  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
};

/**
 * Elimina un refresh token
 */
export const eliminarRefreshToken = async (token) => {
  const query = `
    DELETE FROM refresh_tokens
    WHERE token = $1
    RETURNING *
  `;
  const result = await pool.query(query, [token]);
  return result.rowCount > 0;
};

/**
 * Elimina todos los refresh tokens de un usuario
 */
export const eliminarRefreshTokensDeUsuario = async (usuarioId) => {
  await pool.query(`
    DELETE FROM refresh_tokens
    WHERE usuario_id = $1
  `, [usuarioId]);
};