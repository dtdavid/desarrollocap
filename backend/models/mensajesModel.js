import pool from '../db/connection.js';

/**
 * Obtiene todos los mensajes entre el remitente y destinatario
 * @param {number} remitenteId
 * @param {number} destinatarioId
 */
export const obtenerMensajes = async (remitenteId, destinatarioId) => {
  const query = `
    SELECT * FROM Mensajes 
    WHERE (remitente_id = $1 AND destinatario_id = $2)
       OR (remitente_id = $2 AND destinatario_id = $1)
    ORDER BY fecha_envio ASC
  `;
  const values = [remitenteId, destinatarioId];
  const { rows } = await pool.query(query, values);
  return rows;
};
/**
 * Obtiene todos los mensajes donde el usuario es remitente o destinatario
 * @param {number} usuarioId 
 */
export const obtenerMensajesDeUsuario = async (usuarioId) => {
  const query = `
    SELECT * FROM Mensajes
    WHERE remitente_id = $1 OR destinatario_id = $1
    ORDER BY fecha_envio DESC
  `;
  const { rows } = await pool.query(query, [usuarioId]);
  return rows;
};

/**
 * Crea un nuevo mensaje
 * @param {Object} mensaje 
 */
export const crearMensaje = async (mensaje) => {
  const { remitente_id, destinatario_id, contenido } = mensaje;
  const query = `
    INSERT INTO Mensajes (remitente_id, destinatario_id, contenido)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [remitente_id, destinatario_id, contenido];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Marca un mensaje como leído
 * @param {number} id 
 */
export const marcarLeido = async (id) => {
  const { rowCount } = await pool.query(
    'UPDATE Mensajes SET leido = TRUE WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};
