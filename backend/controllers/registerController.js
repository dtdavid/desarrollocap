// controllers/registerController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verificarEmailExistente, insertarUsuario } from '../models/registerModel.js';

if (!process.env.JWT_SECRET) throw new Error("Falta JWT_SECRET en .env");
const SECRET_KEY = process.env.JWT_SECRET 

const EXPIRATION = process.env.JWT_EXPIRATION || '7d';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const register = async (req, res) => {
   console.log("➡️ Entrando al controlador de registro")
  const { nombre, apellido, email, password, password2, rol = "estudiante" } = req.body;

  if (!nombre || !apellido || !email || !password || !password2) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  if (password !== password2) {
    return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      success: false,
      error: "Requisitos contraseña:",
      details: [
        "Mínimo 8 caracteres",
        "1 mayúscula",
        "1 minúscula",
        "1 número",
        "1 carácter especial (@$!%*?&)"
      ]
   });
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

    const usuario = await insertarUsuario({ nombre, apellido, email, password: hashedPassword, rol });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, {
      expiresIn: EXPIRATION,
    });

    res.status(201).json({ token, usuario });
  } catch (err) {
    console.error(err);
    console.error("Error al registrar usuario:", err); // muestra todo el error
res.status(500).json({ mensaje: err.detail || err.message || "Error interno del servidor" });

  }
};

