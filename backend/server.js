// backend/server.js
import 'dotenv/config'; // Forma moderna de cargar dotenv con ES Modules

import express from 'express';
import cors from 'cors';
import pg from 'pg'; // Importa pg completo, luego desestructura si necesitas Pool
const { Pool } = pg; // Desestructuramos Pool de pg

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());

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

// Aquí irán tus rutas de API, por ejemplo:
// Si tienes archivos de rutas separados, tendrías que importarlos así:
// import authRoutes from './routes/authRoutes.js'; // Nota el .js al final
// app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});

// Exportar la instancia de la app para pruebas con Supertest (si es necesario)
// module.exports = app; // Esto ya no es válido con ES Modules
export default app; // Usamos export default para exportar la app