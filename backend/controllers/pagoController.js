import pool from "../db/connection.js";

export const registrarPago = async (req, res) => {
  const { carrito, total } = req.body;

  if (!carrito || !Array.isArray(carrito) || carrito.length === 0 || !total) {
    return res.status(400).json({ error: "Datos de pago inválidos" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO pagos (total, detalle) VALUES ($1, $2) RETURNING *",
      [total, JSON.stringify(carrito)]
    );

    res.status(201).json({
      mensaje: "✅ Pago registrado correctamente",
      pago: resultado.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar pago:", error.message);
    res.status(500).json({ error: "Error interno al registrar el pago" });
  }
};
