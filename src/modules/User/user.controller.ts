
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { Tuser } from "./user.interface";

const createUser = catchAsync(async (req, res) => {
    
  
    const result = await UserServices.createUserIntoDB(req.body as Tuser) ;
  
    return res.status(httpStatus.OK).json({
      success: true,
      message: "user is created successfully",
      data: result,
    });
  });

export const UserController={
    createUser,
}