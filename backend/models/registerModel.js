// models/registerModel.js
import pool from '../db/connection.js';

/**
 * Verifica si un email ya está registrado
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} - True si el email existe
 */
export const verificarEmailExistente = async (email) => {
  try {
    const result = await pool.query(
      'SELECT 1 FROM Usuarios WHERE email = $1',
      [email.toLowerCase()]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error al verificar email:', error);
    throw error;
  }
};

/**
 * Inserta un nuevo usuario en la base de datos
 * @param {Object} usuarioData - Datos del usuario
 * @returns {Promise<Object>} - Usuario creado
 */
export const insertarUsuario = async ({ nombre, apellido, email, password, rol }) => {
  try {
    const result = await pool.query(
      `INSERT INTO Usuarios (
        nombre, apellido, email, password, rol, activo
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nombre, apellido, email, rol, fecha_registro`,
      [
        nombre,
        apellido,
        email.toLowerCase(),
        password,
        rol,
        true // activo = true por defecto
      ]
    );

    if (result.rows.length === 0) {
      throw new Error('No se pudo crear el usuario');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};
