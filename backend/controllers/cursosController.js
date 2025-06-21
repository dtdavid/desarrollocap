// controllers/cursosController.js
import { 
  insertarCursos,
  insertarCursosDePrueba,
  eliminarTodosCursos 
} from '../models/cursoModel.js';

/**
 * POST /api/test/cursos/insertar
 * Inserta un curso de prueba hardcodeado (para desarrollo)
 */
export const insertarCursoTest = async (req, res) => {
  try {
    const nuevoCurso = await insertarCursosDePrueba();
    res.status(201).json({
      success: true,
      message: 'Curso de prueba insertado',
      data: nuevoCurso[0] // Retorna solo el primero
    });
  } catch (error) {
    handleTestError(res, error);
  }
};

/**
 * POST /api/test/cursos/migrar
 * Inserta múltiples cursos desde un JSON (para migraciones)
 */
export const migrarCursos = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      throw new Error('Se esperaba un array de cursos');
    }

    const resultados = await insertarCursos(req.body);
    res.status(201).json({
      success: true,
      message: `${resultados.length} cursos insertados`,
      data: resultados
    });
  } catch (error) {
    handleTestError(res, error);
  }
};

/**
 * DELETE /api/test/cursos/reset
 * Elimina todos los cursos (solo para testing)
 */
export const resetCursos = async (req, res) => {
  try {
    await eliminarTodosCursos();
    res.json({ 
      success: true,
      message: 'Todos los cursos fueron eliminados' 
    });
  } catch (error) {
    handleTestError(res, error);
  }
};

// Helper para errores
const handleTestError = (res, error) => {
  console.error('[TEST ERROR]', error);
  res.status(500).json({
    success: false,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

