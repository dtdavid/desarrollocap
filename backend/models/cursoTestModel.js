import pool from '../db/connection.js';

export const insertarCursoDePrueba = async () => {
  const query = `
    INSERT INTO cursos (
      titulo, descripcion, categoria, nivel, precio,
      fecha_inicio, fecha_fin, duracion, disponible,
      modalidad, docencia, imagen, instructor_id, estado
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;
  `;

  const values = [
    'Introducción a React',
    'Aprende los fundamentos de React desde cero.',
    'Desarrollo Web',
    'Básico',
    19990,
    '2025-07-01',
    '2025-08-01',
    '4 semanas',
    true,
    'e-learning',
    'Asincrónica',
    'https://example.com/react.jpg',
    2, // asegúrate que este ID exista
    'activo'
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
