import { insertarCursoDePrueba } from '../models/cursoTestModel.js';

export const insertarCursoTest = async (req, res) => {
  try {
    const nuevoCurso = await insertarCursoDePrueba();
    res.status(201).json({
      mensaje: 'Curso de prueba insertado correctamente',
      curso: nuevoCurso
    });
  } catch (error) {
    console.error('Error al insertar curso de prueba:', error);
    res.status(500).json({ mensaje: 'Error en el servidor al insertar curso' });
  }
};
