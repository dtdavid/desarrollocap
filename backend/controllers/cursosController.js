import {
  getAllCursos,
  getCursoById as getCursoByIdModel,
  createCurso as createCursoModel,
  updateCurso as updateCursoModel,
  deleteCurso as deleteCursoModel,
  insertarCursosDePrueba,
  eliminarTodosCursos,
   insertarCursosMasivos
} from '../models/cursoModel.js';

// Helper de errores
const handleError = (res, error) => {
  console.error('[ERROR]', error);
  res.status(500).json({
    success: false,
    error: error.message
  });
};

// Controladores
export const getCursos = async (req, res) => {
  try {
    const cursos = await getAllCursos();
    res.json({ success: true, data: cursos });
  } catch (error) {
    handleError(res, error);
  }
};

export const getCursoById = async (req, res) => {
  try {
    const curso = await getCursoByIdModel(req.params.id);
    if (!curso) return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    res.json({ success: true, data: curso });
  } catch (error) {
    handleError(res, error);
  }
};

export const createCurso = async (req, res) => {
  try {
    const nuevoCurso = await createCursoModel(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Curso creado',
      data: nuevoCurso 
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCurso = async (req, res) => {
  try {
    const cursoActualizado = await updateCursoModel(req.params.id, req.body);
    if (!cursoActualizado) {
      return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    }
    res.json({ 
      success: true, 
      message: 'Curso actualizado',
      data: cursoActualizado 
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCurso = async (req, res) => {
  try {
    const deleted = await deleteCursoModel(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    }
    res.json({ success: true, message: 'Curso eliminado' });
  } catch (error) {
    handleError(res, error);
  }
};

// Controladores para testing
export const insertarCursoTest = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Acción prohibida en producción' });
  }
  try {
    const curso = await insertarCursosDePrueba();
    res.status(201).json({ success: true, data: curso });
  } catch (error) {
    handleError(res, error);
  }
};

export const resetCursos = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Acción prohibida en producción' });
  }
  try {
    await eliminarTodosCursos();
    res.json({ success: true, message: 'Todos los cursos eliminados' });
  } catch (error) {
    handleError(res, error);
  }
};

export const migrarCursos = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Acción prohibida en producción' });
  }

  try {
    if (!Array.isArray(req.body)) {
      throw new Error('Se esperaba un array de cursos');
    }
    
    const resultados = await insertarCursosMasivos(req.body);
    
    res.status(201).json({
      success: true,
      message: `${resultados.length} cursos insertados`,
      data: resultados
    });
  } catch (error) {
    handleError(res, error);
  }
};

