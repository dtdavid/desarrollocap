// verificarPassword.js
import bcrypt from 'bcryptjs';

// Hash copiado desde la base de datos
const hashDesdeBD = '$2b$10$HxGIFpexi3ya4iZP7rNwDeL8/8RgAPAN93WRU3cMAqZcAAQ5iXfp6';

// Contraseña original que crees que fue usada
const contraseñaOriginal = 'David@11';

const verificar = async () => {
  try {
    const resultado = await bcrypt.compare(contraseñaOriginal, hashDesdeBD);
    console.log('¿La contraseña coincide con el hash?', resultado);
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
  } finally {
    // Solo necesario si estás usando Node directamente
    process.exit();
  }
};

verificar();

