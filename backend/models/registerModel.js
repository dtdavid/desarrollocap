// models/registerModel.js
import pool from '../db/connection.js';

// Verifica si ya existe un usuario con ese email
export const verificarEmailExistente = async (email) => {
  const resultado = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
  return resultado.rows.length > 0;
};

// Inserta un nuevo usuario y devuelve los datos seleccionados
export const insertarUsuario = async ({ nombre, apellido, email, hashedPassword, rol }) => {

  const query = `
    INSERT INTO usuarios (nombre, apellido, email, password, rol)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nombre, apellido, email, rol
  `;
  const valores = [nombre, apellido, email, hashedPassword, rol];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0];
};
