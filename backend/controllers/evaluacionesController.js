import * as evaluacionesModel from '../models/evaluacionesModel.js';

export const getEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await evaluacionesModel.obtenerEvaluaciones();
    res.json({
      success:true,
      data:evaluaciones
  });
  }catch (error) {
    console.error('Error getting evaluations:', error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

export const getEvaluacionPorId = async (req, res) => {
  try {
    const evaluacion = await evaluacionesModel.obtenerEvaluacionPorId(req.params.id);
    evaluacion ? res.json({
      success:true,
      data:evaluacion
  }) : res.status(404).json({ error: 'Evaluación no encontrada' });
  } catch (error) {
    console.error('Error getting evaluations:', error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

export const postEvaluacion = async (req, res) => {
  try {
    const nueva = await evaluacionesModel.crearEvaluacion(req.body);
    res.status(201).json({
      success:true,
      data:nueva
  });
  } catch (error) {
    console.error('Error getting evaluations:', error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

export const putEvaluacion = async (req, res) => {
  try {
    const actualizada = await evaluacionesModel.actualizarEvaluacion(req.params.id, req.body);
    actualizada ? res.json({
      success:true,
      data:actualizada
  }) : res.status(404).json({ error: 'Evaluación no encontrada' });
  } catch (error) {
    console.error('Error getting evaluations:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvaluacion = async (req, res) => {
  try {
    const eliminada = await evaluacionesModel.eliminarEvaluacion(req.params.id);
    eliminada ? res.json({ 
  success: true,
  data: { message: 'Evaluación eliminada', id: req.params.id }
}) : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    console.error('Error getting evaluations:', error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};
