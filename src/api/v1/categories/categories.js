import mongoose from 'mongoose';
import { v1 as uuidv1 } from 'uuid';

/**
 * Categories Schema
 */
const CategoriesSchema = new mongoose.Schema({
  cId: { type: String, default: _ => uuidv1() },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

/**
 * @typedef Categories
 */
export default mongoose.model('Categories', CategoriesSchema);
