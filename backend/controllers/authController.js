//Ruta para login
//comparar contraseña con bcrypt.compare
//generar JWT con jwt.sign
// Este controlador maneja la autenticación de usuarios en el login

// Importamos el módulo 'jsonwebtoken' para crear y verificar tokens JWT
import jwt from 'jsonwebtoken';

// Importamos bcrypt para comparar contraseñas hasheadas
import bcrypt from 'bcryptjs';

// Importamos la función de conexión a PostgreSQL
import pool  from '../db/connection.js'; // asegúrate de tener esta conexión creada

// Obtenemos la clave secreta desde variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_por_defecto';
const EXPIRATION = process.env.JWT_EXPIRATION || '3h'; // Tiempo de expiración del token

// Controlador para iniciar sesión
export const login = async (req, res) => {
  try {
    // Extraemos el email y password desde el cuerpo de la solicitud
    const { email, password } = req.body;

    // Validamos que ambos campos estén presentes
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
    }

    // Buscamos al usuario en la base de datos por su email
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = resultado.rows[0];

    // Si no se encuentra el usuario, retornamos error
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    // Si el usuario existe, verificamos la contraseña
    // Aseguramos que el campo password del usuario no sea undefined
     if (!usuario.password) {
        return res.status(500).json({ mensaje: 'Error: el campo password no está definido para el usuario.' });
    }

    console.log('Usuario encontrado:', usuario);
    console.log('Password recibido:', password);
    console.log('Password almacenado:', usuario.password);

    // Comparamos la contraseña enviada con la hasheada en la base de datos
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Creamos el token JWT con el id y rol del usuario
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '3h' } // Token expira en 2 horas
    );

    // Retornamos el token al cliente
    res.status(200).json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
