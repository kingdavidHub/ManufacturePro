import mongoose, { Schema, Document, Model } from 'mongoose';
import { WarehouseName, WarehouseLocation } from '../types';

export interface IWarehouse extends Document {
  _id: mongoose.Types.ObjectId;
  name: WarehouseName;
  location: WarehouseLocation;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, enum: Object.values(WarehouseName), required: true, unique: true },
    location: { type: String, enum: Object.values(WarehouseLocation), required: true, unique: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Warehouse: Model<IWarehouse> = mongoose.model<IWarehouse>('Warehouse', warehouseSchema);
