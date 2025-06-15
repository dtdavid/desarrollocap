import * as recursosModel from '../models/recursosModel.js';

export const getRecursos = async (req, res) => {
  const recursos = await recursosModel.obtenerRecursos();
  res.json(recursos);
};

export const getRecursoPorId = async (req, res) => {
  const recurso = await recursosModel.obtenerRecursoPorId(req.params.id);
  recurso ? res.json(recurso) : res.status(404).json({ error: 'Recurso no encontrado' });
};

export const postRecurso = async (req, res) => {
  const nuevo = await recursosModel.crearRecurso(req.body);
  res.status(201).json(nuevo);
};

export const putRecurso = async (req, res) => {
  const actualizado = await recursosModel.actualizarRecurso(req.params.id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ error: 'Recurso no encontrado' });
};

export const deleteRecurso = async (req, res) => {
  const eliminado = await recursosModel.eliminarRecurso(req.params.id);
  eliminado ? res.json({ mensaje: 'Recurso eliminado' }) : res.status(404).json({ error: 'No encontrado' });
};
