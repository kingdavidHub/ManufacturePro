import mongoose, { Document, Model } from 'mongoose';
import { ProductType } from '../types';
export interface IProduction extends Document {
    _id: mongoose.Types.ObjectId;
    product: ProductType;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Production: Model<IProduction>;
//# sourceMappingURL=production.model.d.ts.map