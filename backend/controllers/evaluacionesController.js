import * as evaluacionesModel from '../models/evaluacionesModel.js';

export const getEvaluaciones = async (req, res) => {
  const evaluaciones = await evaluacionesModel.obtenerEvaluaciones();
  res.json(evaluaciones);
};

export const getEvaluacionPorId = async (req, res) => {
  const evaluacion = await evaluacionesModel.obtenerEvaluacionPorId(req.params.id);
  evaluacion ? res.json(evaluacion) : res.status(404).json({ error: 'Evaluación no encontrada' });
};

export const postEvaluacion = async (req, res) => {
  const nueva = await evaluacionesModel.crearEvaluacion(req.body);
  res.status(201).json(nueva);
};

export const putEvaluacion = async (req, res) => {
  const actualizada = await evaluacionesModel.actualizarEvaluacion(req.params.id, req.body);
  actualizada ? res.json(actualizada) : res.status(404).json({ error: 'Evaluación no encontrada' });
};

export const deleteEvaluacion = async (req, res) => {
  const eliminada = await evaluacionesModel.eliminarEvaluacion(req.params.id);
  eliminada ? res.json({ mensaje: 'Evaluación eliminada' }) : res.status(404).json({ error: 'No encontrada' });
};
