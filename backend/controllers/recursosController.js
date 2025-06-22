import * as recursosModel from '../models/recursosModel.js';

export const getRecursos = async (req, res) => {
  try {
    const recursos = await recursosModel.obtenerRecursos();
    res.json({
      success: true,
      data: recursos,
      count: recursos.length 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error al obtener recursos',
      details: process.env.NODE_ENV === 'development' ? error.message : null
     });
  }
};

export const getRecursoPorId = async (req, res) => {
  try {
    const recurso = await recursosModel.obtenerRecursoPorId(req.params.id);
    recurso ? res.json(
      {
      success: true,
      data: recurso, 
    }
    ) : res.status(404).json({ error: 'Recurso no encontrado' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor' });
  }
};

export const postRecurso = async (req, res) => {
  try {
    const nuevo = await recursosModel.crearRecurso(req.body);
    res.status(201).json({
      success: true,
      data: nuevo,
      count: nuevo.length 
    }

    );
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' }); 
  }
};

export const putRecurso = async (req, res) => {
  try {
    const actualizado = await recursosModel.actualizarRecurso(req.params.id, req.body);
    actualizado ? res.json({
      success: true,
      data: actualizado,
      count: actualizado.length 
    }) : res.status(404).json({ error: 'Recurso no encontrado' });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' });
  }
};

export const deleteRecurso = async (req, res) => {
  try {
    const eliminado = await recursosModel.eliminarRecurso(req.params.id);
    
    if (!eliminado) {
      return res.status(404).json({
        success: false,
        error: 'Recurso no encontrado',
        details: { id: req.params.id }
      });
    }
    res.json({
      success: true,
      data: {
        message: 'Recurso eliminado exitosamente',
        id: req.params.id,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el recurso',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : null
    });
  }
};
