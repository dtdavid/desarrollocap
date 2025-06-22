import { 
  insertarCursos,
  insertarCursosDePrueba,
  eliminarTodosCursos 
} from '../models/cursoModel.js';

// Helper para errores (compartido)
const handleTestError = (res, error) => {
  console.error('[TEST ERROR]', error);
  res.status(500).json({
    success: false,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

// Controladores principales (para rutas normales y test)
export const insertarCursoTest = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Acción prohibida en producción' });
  }

  try {
    const nuevosCursos = await insertarCursosDePrueba();
    res.status(201).json({
      success: true,
      message: 'Curso de prueba insertado',
      data: nuevosCursos[0] // Retorna solo el primero
    });
  } catch (error) {
    handleTestError(res, error);
  }
};

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

export const resetCursos = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Acción prohibida en producción' });
  }

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

