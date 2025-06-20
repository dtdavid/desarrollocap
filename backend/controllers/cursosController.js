// controllers/cursosController.js
import {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso
} from '../models/cursoModel.js';

/**
 * GET /api/cursos
 */
export const getCursos = async (req, res) => {
  try {
    const cursos = await obtenerCursos();
    res.json(cursos);
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * GET /api/cursos/:id
 */
export const getCursoById = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await obtenerCursoPorId(id);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(curso);
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * POST /api/cursos
 */
export const postCurso = async (req, res) => {
  try {
    const nuevoCurso = await crearCurso(req.body);
    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error('Error al crear el curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * PUT /api/cursos/:id
 */
export const putCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const cursoActualizado = await actualizarCurso(id, req.body);
    if (!cursoActualizado) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(cursoActualizado);
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * DELETE /api/cursos/:id
 */
export const deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const cursoEliminado = await eliminarCurso(id);
    if (!cursoEliminado) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

