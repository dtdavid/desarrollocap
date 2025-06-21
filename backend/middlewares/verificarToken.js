import jwt from "jsonwebtoken"; //librería para trabajar con JWT
import dotenv from "dotenv"; // librería para manejar variables de entorno
dotenv.config(); // Cargamos las variables de entorno desde el archivo .env

export const verificarToken = (req, res, next) => {
  try {
    // Verificamos si el token está presente en los headers de la solicitud
    // Formato esperado "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token mal formado o no proporcionado" });
    }
    const token = authHeader.split(" ")[1];
    // Verificamos el token usando la clave secreta
    // Si el token es válido, se decodifica y se guarda en req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { 
      id: decoded.id,
      rol: decoded.rol,
      email: decoded.email,
       }; // Guardamos los datos necesarios del usuario para las rutas siguientes
    
    next(); // pasa al siguienete middleware o ruta
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Middleware para admin 
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "No autenticado" });
  }
  
  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ 
      error: "Acceso no autorizado: Se requiere rol de administrador" 
    });
  }
  
  next();
};
