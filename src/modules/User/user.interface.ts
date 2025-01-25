import { Model } from "mongoose";
import { User_Role } from "./user.constant";

export interface TUser  {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "user";
  address: string;
  isDeleted?: boolean;
  passwordChangeAt?:Date
};

export interface User extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plaintextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTissuedBeforePasswordChanged(
    passwordChangedTimeSpan: Date,
    jwtIssuedTimeSpan: number
  ): boolean;
 
}
export type TUserRole=keyof typeof User_Role