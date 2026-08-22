import mongoose, { Document, Model } from 'mongoose';
import { Role } from '../types';
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    role: Role;
    warehouseId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: Model<IUser>;
//# sourceMappingURL=user.model.d.ts.map