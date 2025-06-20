import pool from '../db/connection.js';

export const obtenerEvaluaciones = async () => {
  const { rows } = await pool.query('SELECT * FROM Evaluaciones');
  return rows;
};

export const obtenerEvaluacionPorId = async (id) => {
  const { rows } = await pool.query('SELECT * FROM Evaluaciones WHERE id = $1', [id]);
  return rows[0];
};

export const crearEvaluacion = async (evaluacion) => {
  const { usuario_id, curso_id, calificacion, comentario } = evaluacion;

  const query = `
    INSERT INTO Evaluaciones (usuario_id, curso_id, calificacion, comentario)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [usuario_id, curso_id, calificacion, comentario];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const actualizarEvaluacion = async (id, evaluacion) => {
  const { usuario_id, curso_id, calificacion, comentario } = evaluacion;

  const query = `
    UPDATE Evaluaciones
    SET usuario_id = $1, curso_id = $2, calificacion = $3, comentario = $4
    WHERE id = $5 RETURNING *;
  `;
  const values = [usuario_id, curso_id, calificacion, comentario, id];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const eliminarEvaluacion = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM Evaluaciones WHERE id = $1', [id]);
  return rowCount > 0;
};
