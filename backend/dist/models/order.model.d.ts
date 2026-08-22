import mongoose, { Document, Model } from 'mongoose';
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
export declare const Order: Model<IOrder>;
//# sourceMappingURL=order.model.d.ts.map