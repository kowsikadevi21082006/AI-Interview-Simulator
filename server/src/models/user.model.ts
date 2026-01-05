import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, index: true, unique: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
