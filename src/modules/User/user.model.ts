/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<TUser>(
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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  this.password = await bcrypt.hash(this.password, Number(config.SALT_ROUND));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("User", userSchema);
