// models/loginModel.js
import pool from '../db/connection.js';

export const obtenerUsuarioPorEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const resultado = await pool.query(query, [email]);
  return resultado.rows[0];
};
