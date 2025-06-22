// models/cursoModels.js

import pool from '../db/connection.js';
import format from 'pg-format';

/**
 * Inserta múltiples cursos con validación
 */
export const insertarCursos = async (cursos) => {
  const validated = cursos.map(validateCurso);
  const query = format(
    `INSERT INTO cursos (
      titulo, descripcion, categoria, nivel, precio,
      fecha_inicio, fecha_fin, duracion, disponible,
      modalidad, docencia, imagen, instructor_id, estado
    ) VALUES %L RETURNING *`,
    validated.map(curso => [
      curso.titulo,
      curso.descripcion,
      curso.categoria,
      curso.nivel,
      curso.precio,
      curso.fecha_inicio,
      curso.fecha_fin,
      curso.duracion,
      curso.disponible,
      curso.modalidad,
      curso.docencia,
      curso.imagen,
      curso.instructor_id,
      curso.estado
    ])
  );

  const { rows } = await pool.query(query);
  return rows;
};

/**
 * Datos de prueba predeterminados
 */
export const insertarCursosDePrueba = async () => {
  const cursosDemo = [
    {
      titulo: "Curso de Prueba",
      descripcion: "Descripción de ejemplo",
      categoria: "Testing",
      precio: 0,
      duracion: "1 semana",
      disponible: true
    }
  ];
  return await insertarCursos(cursosDemo);
};

/**
 * Elimina todos los cursos (¡Cuidado en producción!)
 */
export const eliminarTodosCursos = async () => {
  await pool.query('TRUNCATE TABLE cursos RESTART IDENTITY CASCADE');
};

// Validación de campos
const validateCurso = (curso) => ({
  titulo: curso.titulo || 'Sin título',
  descripcion: curso.descripcion || '',
  categoria: curso.categoria || 'General',
  nivel: curso.nivel || 'Básico',
  precio: Number(curso.precio) || 0,
  fecha_inicio: curso.fechaInicio ? new Date(curso.fechaInicio) : new Date(),
  fecha_fin: curso.fechaFin ? new Date(curso.fechaFin) : new Date(Date.now() + 604800000), // +7 días
  duracion: curso.duracion || '4 semanas',
  disponible: curso.disponible !== false,
  modalidad: curso.modalidad || 'e-learning',
  docencia: curso.docencia || 'Asincrónica',
  imagen: curso.imagen || null,
  instructor_id: curso.instructor_id || null,
  estado: curso.estado || 'activo'
});

