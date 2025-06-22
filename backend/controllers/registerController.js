// controllers/registerController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verificarEmailExistente, insertarUsuario } from '../models/registerModel.js';

// Validación de variables de entorno
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está definido en las variables de entorno');
  process.exit(1);
}

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRATION = process.env.JWT_EXPIRATION || '7d';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const register = async (req, res) => {
  console.log('Entrando al controlador de registro');
  const { nombre, apellido, email, password, password2, rol = 'estudiante' } = req.body;

  // Validaciones mejoradas
  const errors = [];
  if (!nombre) errors.push('El nombre es obligatorio');
  if (!apellido) errors.push('El apellido es obligatorio');
  if (!email) errors.push('El email es obligatorio');
  if (!password) errors.push('La contraseña es obligatoria');
  if (!password2) errors.push('La confirmación de contraseña es obligatoria');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos obligatorios',
      details: errors
    });
  }

  if (password !== password2) {
    return res.status(400).json({
      success: false,
      error: 'Las contraseñas no coinciden'
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      error: 'La contraseña no cumple los requisitos',
      requirements: [
        'Mínimo 8 caracteres',
        '1 mayúscula',
        '1 minúscula',
        '1 número',
        '1 carácter especial (@$!%*?&)'
      ]
    });
  }

  if (!['estudiante', 'docente', 'administrador'].includes(rol)) {
    return res.status(400).json({
      success: false,
      error: 'Rol inválido',
      rolesPermitidos: ['estudiante', 'docente', 'administrador']
    });
  }

  try {
    // Verificar si el email ya existe
    const existe = await verificarEmailExistente(email);
    if (existe) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const usuario = await insertarUsuario({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol
    });

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
      },
      SECRET_KEY,
      { expiresIn: EXPIRATION }
    );

    // Respuesta exitosa
    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        fecha_registro: usuario.fecha_registro
      }
    });

  } catch (error) {
    console.error('Error completo en registro:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });

    // Manejo de errores específicos de PostgreSQL
    let errorMessage = 'Error en el servidor al registrar usuario';
    let statusCode = 500;

    if (error.code === '23505') { // Violación de constraint único
      errorMessage = 'El email ya está registrado';
      statusCode = 400;
    } else if (error.message.includes('violates check constraint')) {
      errorMessage = 'Datos inválidos proporcionados';
      statusCode = 400;
    }

    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};