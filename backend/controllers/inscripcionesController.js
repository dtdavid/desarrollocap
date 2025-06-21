import {
  obtenerInscripciones,
  obtenerInscripcionPorId,
  crearInscripcion,
  actualizarInscripcion,
  eliminarInscripcion
} from '../models/inscripcionesModel.js';

export const getInscripciones = async (req, res) => {
  try {
    const inscripciones = await obtenerInscripciones();
    res.json({
      success: true,
      data: inscripciones 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
};

export const getInscripcion = async (req, res) => {
  try {
    const inscripcion = await obtenerInscripcionPorId(req.params.id);
    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json({
      success: true,
      data: inscripcion 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la inscripción' });
  }
};

export const postInscripcion = async (req, res) => {
  try {
    const nueva = await crearInscripcion(req.body);
    res.status(201).json({
      success: true,
      data: nueva,
      message: "Inscripción creada exitosamente"
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la inscripción' });
  }
};

export const putInscripcion = async (req, res) => {
  try {
    const actualizada = await actualizarInscripcion(req.params.id, req.body);
    if (!actualizada) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json({
      success: true,
      data: actualizada
    });
  } catch (error) {
    res.status(500).json({

      error: 'Error al actualizar la inscripción' });
  }
};

export const deleteInscripcion = async (req, res) => {
  try {
    const inscripcionEliminada = await eliminarInscripcion(req.params.id);
    res.json({ mensaje: 'Inscripción eliminada', inscripcion: inscripcionEliminada });
  } catch (error) {
    if (error.message === 'Inscripción no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({
       success: false,
       error: 'Error al eliminar la inscripción',
       details: error.message });
  }
};
