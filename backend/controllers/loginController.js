// controllers/loginController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { obtenerUsuarioPorEmail } from '../models/loginModel.js';

if (!process.env.JWT_SECRET) throw new Error("Falta JWT_SECRET en .env");
// Si no se define JWT_SECRET en el entorno, lanza un error
const SECRET_KEY = process.env.JWT_SECRET 

const EXPIRATION = process.env.JWT_EXPIRATION || '3h';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
    }

    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario || !usuario.password) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado en base de datos' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: EXPIRATION }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

