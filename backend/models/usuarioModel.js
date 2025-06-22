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

/**
 * Verifica si un email ya está registrado
 */
export const verificarEmailExistente = async (email) => {
    const result = await pool.query(
        'SELECT 1 FROM Usuarios WHERE email = $1', 
        [email.toLowerCase()] // Normalizamos el email
    );
    return result.rowCount > 0;
};

/**
 * Inserta un nuevo usuario en la base de datos
 */
export const insertarUsuario = async ({ nombre, apellido, email, password, rol = 'estudiante' }) => {
    // Validación adicional del rol
    const rolesPermitidos = ['administrador', 'docente', 'estudiante'];
    if (!rolesPermitidos.includes(rol)) {
        throw new Error('Rol no válido');
    }

    const result = await pool.query(
        `INSERT INTO Usuarios (
            nombre, apellido, email, password, rol, activo
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, nombre, apellido, email, rol, fecha_registro`,
        [
            nombre,
            apellido,
            email.toLowerCase(), // Guardamos email en minúsculas
            password,
            rol,
            true // activo = true por defecto
        ]
    );
    
    if (result.rows.length === 0) {
        throw new Error('No se pudo crear el usuario');
    }
    
    return result.rows[0];
};