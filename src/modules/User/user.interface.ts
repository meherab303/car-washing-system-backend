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
};

export interface User extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plaintextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
 
}
export type TUserRole=keyof typeof User_Role