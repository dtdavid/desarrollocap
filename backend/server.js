// backend/server.js
import 'dotenv/config'; // Forma moderna de cargar dotenv con ES Modules
// comprobamos que la variable de entorno JWT_SECRET está cargada
console.log("JWT_SECRET cargado:", process.env.JWT_SECRET)

//importamos las dependencias base del proyecto
import express from 'express';
import cors from 'cors';

// Importamos las rutas de autenticación y perfil
import registerRoutes from './routes/registerRoutes.js';
import loginRoutes from "./routes/loginRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import usuariosRoutes from './routes/usuariosRoutes.js';
import cursoTestRoutes from './routes/cursoTestRoutes.js';
//Importamos las rutas de cursos
import cursosRoutes from './routes/cursosRoutes.js';
//Importamos las rutas de inscripciones
import inscripcionesRoutes from './routes/inscripcionesRoutes.js';
// Importamos las rutas de recursos
import recursosRoutes from './routes/recursosRoutes.js';
// Importamos las rutas de evaluaciones
import evaluacionesRoutes from './routes/evaluacionesRoutes.js';
// Importamos las rutas de mensajes
import mensajesRoutes from './routes/mensajesRoutes.js';


// conexión a la base de datos PostgreSQL
// Importamos la conexión a la base de datos
import pool from './db/connection.js'; 

// Verificamos la conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a PostgreSQL:', res.rows[0]);
  }
});


const app = express(); // instancia de la app de Express
const PORT = process.env.PORT || 5000; // puerto que usará el servidor, por defecto 5000


// Middleware
app.use(cors()); //habilitamos cors para permitir peticiones desde el frontend
app.use(express.json()); // Parseamos el cuerpo de las peticiones como JSON
//rutas de autenticación
app.use('/api/auth', loginRoutes); // Ahora /api/auth/login está activa
app.use('/api/auth', registerRoutes); // Ahora /api/auth/register está activa
app.use("/api/perfil", perfilRoutes); // Ruta para manejar el perfil de usuario
app.use('/api/usuarios', usuariosRoutes); // Ruta para manejar usuarios
// Rutas de cursos
app.use('/api/cursos', cursosRoutes); // Ruta para manejar cursos
app.use('/api/test/cursos', cursoTestRoutes);
// Rutas de inscripciones
app.use('/api/inscripciones', inscripcionesRoutes); // Ruta para manejar inscripciones
// Rutas de recursos
app.use('/api/recursos', recursosRoutes);
// Rutas de evaluaciones
app.use('/api/evaluaciones', evaluacionesRoutes);
// Rutas de mensajes
app.use('/api/mensajes', mensajesRoutes);

// Ruta de prueba para verificar conexión al backend y DB
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() AS current_time');
        res.json({
            message: '¡Backend de DesarrolloCap funcionando con ES Modules!',
            dbTime: result.rows[0].current_time
        });
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        res.status(500).json({ error: 'Error interno del servidor. No se pudo conectar a la base de datos.' });
    }
});




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});

// Exportar la instancia de la app para pruebas con Supertest 

export default app; // Usamos export default para exportar la app