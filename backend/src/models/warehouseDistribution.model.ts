import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProductType, DistributionStatus } from '../types';

export interface IWarehouseDistribution extends Document {
  _id: mongoose.Types.ObjectId;
  productionId?: mongoose.Types.ObjectId;
  warehouseId: mongoose.Types.ObjectId;
  product: ProductType;
  amount: number;
  status: DistributionStatus;
  distributedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const warehouseDistributionSchema = new Schema<IWarehouseDistribution>(
  {
    productionId: { type: Schema.Types.ObjectId, ref: 'Production', default: null },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    product: { type: String, enum: Object.values(ProductType), required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: Object.values(DistributionStatus), required: true },
    distributedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const WarehouseDistribution: Model<IWarehouseDistribution> = mongoose.model<IWarehouseDistribution>(
  'WarehouseDistribution',
  warehouseDistributionSchema
);
