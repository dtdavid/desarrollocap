// import jwt from 'jsonwebtoken';
// import 'dotenv/config';

// export const verificarToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader?.split(' ')[1]; // Bearer <token>

//   if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.usuario = decoded; // { id, rol, iat, exp }
//     next();
//   } catch (error) {
//     return res.status(403).json({ mensaje: 'Token inválido o expirado' });
//   }
// };
