import { Tuser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB=async(payload:Tuser)=>{
const newUser=await UserModel.create(payload)
return newUser
}

export const UserServices={
    createUserIntoDB
}