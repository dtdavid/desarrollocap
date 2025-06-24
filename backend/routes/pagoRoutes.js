import express from "express";
import { registrarPago } from "../controllers/pagoController.js";

const router = express.Router();

router.post("/checkouts", registrarPago);

export default router;
