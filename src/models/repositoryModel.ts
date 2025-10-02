import { Schema, model, Types } from "mongoose";
import { IEquipo } from "../interfaces/IInventary";

const equipoSchema = new Schema<IEquipo>({
  numeroSerie: {
    type: String,
    required: true,
    unique: true
  },
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ["laptop", "desktop", "servidor", "monitor", "impresora", "otro"],
    required: true
  },
  estado: {
    type: String,
    enum: ["disponible", "asignado", "mantenimiento", "baja"],
    default: "disponible"
  },
  ubicacion: {
    type: String
  },
  fechaCompra: {
    type: Date
  },
  garantiaHasta: {
    type: Date
  },
  asignadoA: {
    type: Types.ObjectId,
    ref: "User",
    default: null
  },
  fechaAsignacion: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export const equipoModel = model<IEquipo>("Equipo", equipoSchema);
