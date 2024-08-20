import mongoose, { Schema, model, Document } from "mongoose";

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  lastName: string;
  maidenName?: string;
  phoneNumber: string;
  email?: string;
  userName: string;
  password: string;
  token?: string;
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true, maxlength: 40 },
  lastName: { type: String, required: true, maxlength: 40 },
  maidenName: { type: String, maxlength: 40 },
  phoneNumber: { type: String, required: true, length: 10 },
  email: { type: String, maxlength: 40, match: /^\S+@\S+\.\S+$/ },
  userName: { type: String, required: true, maxlength: 30 },
  password: { type: String, required: true, maxlength: 20 },
  token: { type: String },
});

userSchema.index({ phoneNumber: 1, userName: 1 }, { unique: true });
export const UserModel = model<IUserDocument>("User", userSchema);
