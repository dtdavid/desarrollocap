import pool from '../db/connection.js';

// Obtener todas las inscripciones
export const obtenerInscripciones = async () => {
  const result = await pool.query(`
    SELECT i.*, u.nombre AS usuario_nombre, c.titulo AS curso_titulo
    FROM inscripciones i
    JOIN usuarios u ON i.usuario_id = u.id
    JOIN cursos c ON i.curso_id = c.id
  `);
  return result.rows;
};

// Obtener una inscripción por ID
export const obtenerInscripcionPorId = async (id) => {
  const result = await pool.query('SELECT * FROM inscripciones WHERE id = $1', [id]);
  return result.rows[0];
};

// Crear nueva inscripción
export const crearInscripcion = async ({ usuario_id, curso_id, estado }) => {
  const result = await pool.query(`
    INSERT INTO inscripciones (usuario_id, curso_id, estado)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [usuario_id, curso_id, estado]);
  return result.rows[0];
};

// Actualizar inscripción
export const actualizarInscripcion = async (id, { estado }) => {
  const result = await pool.query(`
    UPDATE inscripciones SET estado = $1 WHERE id = $2 RETURNING *
  `, [estado, id]);
  return result.rows[0];
};

// Eliminar inscripción
export const eliminarInscripcion = async (id) => {
  const query = `DELETE FROM inscripciones WHERE id = $1 RETURNING * `;
  const {rowCount, rows} = await pool.query(query, [id])
  if (rowCount === 0) {
    throw new Error('Inscripción no encontrada');
  }
  return rows[0]; // Retorna la inscripción eliminada
};
