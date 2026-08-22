import mongoose, { Schema, Document, Model } from 'mongoose';
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

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(Role), required: true },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', default: null },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
