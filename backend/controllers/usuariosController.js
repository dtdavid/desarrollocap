import pool from '../db/connection.js';

//obtener usuario por id
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// obtener perfil del usuario autenticado
export const getPerfilUsuario = async (req, res) => {
  const usuarioId = req.user.id; 

  try {
    const result = await pool.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [usuarioId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Acceso autorizado al perfil',
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
