import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB=async(payload:TUser)=>{
const newUser=await UserModel.create(payload)
return newUser
}
const getAllUsersFromDB=async()=>{
    const result=await UserModel.find()
    return result
}
const getSingleUserFromDB=async(id:string)=>{
    const result=await UserModel.findById(id)
    return result
}
const updateSingleUserIntoDB=async(id:string,payload:Partial<TUser>)=>{
   
    const result=await UserModel.findByIdAndUpdate(
        id,
        payload,
         {
        new: true,
        runValidators: true,
      })
      if(!result){
        throw new Error("failed to update user")
      }
    return result
}
const deleteSingleUserFromDB=async(id:string)=>{
    const result=await UserModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, }
      );
      if(!result){
        throw new Error("failed to delete user")
      }
    return result
}
export const UserServices={
    createUserIntoDB,
   getAllUsersFromDB,
   getSingleUserFromDB,
   updateSingleUserIntoDB,
   deleteSingleUserFromDB
}