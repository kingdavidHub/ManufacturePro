import mongoose, { Document, Model } from 'mongoose';
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
export declare const WarehouseDistribution: Model<IWarehouseDistribution>;
//# sourceMappingURL=warehouseDistribution.model.d.ts.map