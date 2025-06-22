import pool from '../db/connection.js';
import bcrypt from 'bcryptjs';

/**
 * Obtiene usuario por email para login
 */
export const obtenerUsuarioPorEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
};

/**
 * Verifica si un email ya está registrado
 */
export const verificarEmailExistente = async (email) => {
  const result = await pool.query(
    'SELECT 1 FROM usuarios WHERE email = $1', 
    [email]
  );
  return result.rowCount > 0;
};

/**
 * Crea un nuevo usuario
 */
export const crearUsuario = async ({ nombre, apellido, email, password, rol }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = `
    INSERT INTO usuarios (nombre, apellido, email, password, rol)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nombre, apellido, email, rol, fecha_registro
  `;
  
  const result = await pool.query(query, [
    nombre,
    apellido,
    email,
    hashedPassword,
    rol
  ]);
  
  return result.rows[0];
};