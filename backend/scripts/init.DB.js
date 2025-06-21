import { insertarCursos } from '../models/cursoModel.js';
import cursosData from '../../public/data/cursos.json' assert { type: 'json' };

const seedDatabase = async () => {
  try {
    console.log('Insertando cursos...');
    const cursosInsertados = await insertarCursos(cursosData);
    console.log(`${cursosInsertados.length} cursos insertados correctamente`);
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar datos iniciales:', error);
    process.exit(1);
  }
};

seedDatabase();

//este archivo debe ejecutarse con node backend/scripts/initDB.js