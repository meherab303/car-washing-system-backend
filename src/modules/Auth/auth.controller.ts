import catchAsync from "../utils/catchAsync";
import { TLoginUser, TPasswordChang } from "./auth.interface";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body as TLoginUser);
    const {accessToken } = result;
    return res.status(httpStatus.OK).json({
      success: true,
      message: "logged in successfully",
      data: {
        accessToken,
      },
    });
  });


const changePassword = catchAsync(async (req, res) => {
  const { ...passWordData } = req.body as TPasswordChang;

    const result = await AuthServices.changePassword(req?.user,passWordData);
  
    return res.status(httpStatus.OK).json({
      success: true,
      message: "password is changed successfully",
      data: result,
    });
  });



  export const AuthControllers={
    loginUser,
    changePassword,
  }