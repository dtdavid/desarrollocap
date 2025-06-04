// backend/server.js
import 'dotenv/config'; // Forma moderna de cargar dotenv con ES Modules
//importamos las dependencias base del proyecto
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRouthes.js';
import loginRoutes from "./routes/login.routes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import pool from './db/connection.js'; 


const app = express(); // instancia de la app de Express
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors()); //habilitamos cors para permitir peticiones desde el frontend
app.use(express.json()); // Parseamos el cuerpo de las peticiones como JSON
//rutas de autenticación
app.use('/api/auth', authRoutes); // Ahora /api/auth/login está activa
app.use("/", loginRoutes);
app.use("/api/perfil", perfilRoutes); // Ruta para manejar el perfil de usuario
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

// Aquí irán las rutas de API:


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});

// Exportar la instancia de la app para pruebas con Supertest 

export default app; // Usamos export default para exportar la app