import mongoose, { Document, Model } from 'mongoose';
import { WarehouseName, WarehouseLocation } from '../types';
export interface IWarehouse extends Document {
    _id: mongoose.Types.ObjectId;
    name: WarehouseName;
    location: WarehouseLocation;
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Warehouse: Model<IWarehouse>;
//# sourceMappingURL=warehouse.model.d.ts.map