/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { model, Schema } from "mongoose";
import { TUser, User } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<TUser,User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,select:0},
    phone: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    passwordChangeAt:{type:Date}
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

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plaintextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};
userSchema.statics.isJWTissuedBeforePasswordChanged = function (
  passwordChangedTimeSpan: Date,
  jwtIssuedTimeSpan: number
) {
  const jwtIssuedTimeSpanInMiLiSecond = new Date(jwtIssuedTimeSpan * 1000);
  // const passwordChangedTimeSpanInSecond =
  //   new Date(passwordChangedTimeSpan).getTime() / 1000;
  return passwordChangedTimeSpan > jwtIssuedTimeSpanInMiLiSecond;
};

export const UserModel = model<TUser,User>("User", userSchema);
