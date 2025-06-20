// controllers/registerController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verificarEmailExistente, insertarUsuario } from '../models/registerModel.js';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_por_defecto';
const EXPIRATION = process.env.JWT_EXPIRATION || '7d';

export const register = async (req, res) => {
  const { nombre, apellido, email, password, password2, rol = "estudiante" } = req.body;

  if (!nombre || !apellido || !email || !password || !password2) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  if (password !== password2) {
    return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
  }

  if (!["estudiante", "docente", "administrador"].includes(rol)) {
    return res.status(400).json({ mensaje: "Rol inválido" });
  }

  try {
    const existe = await verificarEmailExistente(email);
    if (existe) {
      return res.status(400).json({ mensaje: "Email ya registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = await insertarUsuario({ nombre, apellido, email, hashedPassword, rol });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, {
      expiresIn: EXPIRATION,
    });

    res.status(201).json({ token, usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

