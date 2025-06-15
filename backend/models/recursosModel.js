import pool from '../db/connection.js';

export const obtenerRecursos = async () => {
  const { rows } = await pool.query('SELECT * FROM RecursosCurso');
  return rows;
};

export const obtenerRecursoPorId = async (id) => {
  const { rows } = await pool.query('SELECT * FROM RecursosCurso WHERE id = $1', [id]);
  return rows[0];
};

export const crearRecurso = async (recurso) => {
  const {
    curso_id, titulo, tipo, url
  } = recurso;

  const query = `
    INSERT INTO RecursosCurso (curso_id, titulo, tipo, url)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [curso_id, titulo, tipo, url];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const actualizarRecurso = async (id, recurso) => {
  const {
    curso_id, titulo, tipo, url
  } = recurso;

  const query = `
    UPDATE RecursosCurso
    SET curso_id = $1, titulo = $2, tipo = $3, url = $4
    WHERE id = $5 RETURNING *;
  `;
  const values = [curso_id, titulo, tipo, url, id];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const eliminarRecurso = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM RecursosCurso WHERE id = $1', [id]);
  return rowCount > 0;
};
