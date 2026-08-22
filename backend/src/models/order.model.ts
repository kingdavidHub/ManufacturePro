import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProductType, OrderStatus } from '../types';

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customerName: string;
  customerAddress: string;
  product: ProductType;
  amount: number;
  warehouseId: mongoose.Types.ObjectId;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    product: { type: String, enum: Object.values(ProductType), required: true },
    amount: { type: Number, required: true },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
