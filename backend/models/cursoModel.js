import pool from '../db/connection.js';

/**
 * Obtener todos los cursos disponibles
 */
export const obtenerCursos = async () => {
  const result = await pool.query('SELECT * FROM cursos WHERE disponible = true');
  return result.rows;
};

/**
 * Obtener un curso por su ID
 */
export const obtenerCursoPorId = async (id) => {
  const result = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);
  return result.rows[0];
};

/**
 * Crear un nuevo curso
 */
export const crearCurso = async (cursoData) => {
  const {
    titulo, descripcion, categoria, nivel, precio,
    fecha_inicio, fecha_fin, duracion, disponible,
    modalidad, docencia, imagen, instructor_id, estado
  } = cursoData;

  const query = `
    INSERT INTO cursos 
    (titulo, descripcion, categoria, nivel, precio, fecha_inicio, fecha_fin, duracion, disponible, modalidad, docencia, imagen, instructor_id, estado)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    titulo, descripcion, categoria, nivel, precio,
    fecha_inicio, fecha_fin, duracion, disponible,
    modalidad, docencia, imagen, instructor_id, estado
  ]);

  return result.rows[0];
};

/**
 * Actualizar un curso por ID
 */
export const actualizarCurso = async (id, cursoData) => {
  const campos = Object.keys(cursoData);
  const valores = Object.values(cursoData);

  const setClause = campos.map((campo, index) => `${campo} = $${index + 1}`).join(', ');

  const query = `UPDATE cursos SET ${setClause} WHERE id = $${campos.length + 1} RETURNING *`;

  const result = await pool.query(query, [...valores, id]);
  return result.rows[0];
};

/**
 * Eliminar un curso por ID
 */
export const eliminarCurso = async (id) => {
  const result = await pool.query('DELETE FROM cursos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

