import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userSchema = new Schema<Tuser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    address: { type: String, required: true },
  },
  { timestamps: true },
);
export const UserModel = model<Tuser>("User", userSchema);
