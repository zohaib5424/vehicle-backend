import mongoose from "mongoose";
import { v1 as uuidv1 } from "uuid";

/**
 * Cars Schema
 */
const CarsSchema = new mongoose.Schema({
  carId: { type: String, default: (_) => uuidv1() },
  model: { type: String },
  color: { type: String },
  make: { type: String },
  price: { type: String },
  registration: { type: String },
  categoryId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

/**
 * @typedef Cars
 */
export default mongoose.model("Cars", CarsSchema);
