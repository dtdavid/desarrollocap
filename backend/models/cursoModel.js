// models/cursoModels.js

import pool from '../db/connection.js';
import format from 'pg-format';

// CRUD Básico
export const getAllCursos = async () => {
  const { rows } = await pool.query('SELECT * FROM cursos');
  return rows;
};

export const getCursoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);
  return rows[0] || null;
};

export const createCurso = async (cursoData) => {
  const query = format(
    `INSERT INTO cursos (
      titulo, descripcion, categoria, precio, duracion, disponible
    ) VALUES %L RETURNING *`,
    [[
      cursoData.titulo,
      cursoData.descripcion,
      cursoData.categoria,
      cursoData.precio,
      cursoData.duracion,
      cursoData.disponible
    ]]
  );
  const { rows } = await pool.query(query);
  return rows[0];
};

export const updateCurso = async (id, cursoData) => {
  const { rows } = await pool.query(
    `UPDATE cursos SET
      titulo = $1,
      descripcion = $2,
      categoria = $3,
      precio = $4,
      duracion = $5,
      disponible = $6
    WHERE id = $7
    RETURNING *`,
    [
      cursoData.titulo,
      cursoData.descripcion,
      cursoData.categoria,
      cursoData.precio,
      cursoData.duracion,
      cursoData.disponible,
      id
    ]
  );
  return rows[0] || null;
};

export const deleteCurso = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM cursos WHERE id = $1', [id]);
  return rowCount > 0;
};

// Funciones para testing
export const insertarCursosDePrueba = async () => {
  const cursosDemo = [{
    titulo: "Curso de Prueba",
    descripcion: "Descripción de ejemplo",
    categoria: "Testing",
    precio: 0,
    duracion: "1 semana",
    disponible: true
  }];
  return await createCurso(cursosDemo[0]);
};

export const eliminarTodosCursos = async () => {
  await pool.query('TRUNCATE TABLE cursos RESTART IDENTITY CASCADE');
};

