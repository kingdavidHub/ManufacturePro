import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProductType } from '../types';

export interface IProduction extends Document {
  _id: mongoose.Types.ObjectId;
  product: ProductType;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const productionSchema = new Schema<IProduction>(
  {
    product: { type: String, enum: Object.values(ProductType), required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Production: Model<IProduction> = mongoose.model<IProduction>('Production', productionSchema);
