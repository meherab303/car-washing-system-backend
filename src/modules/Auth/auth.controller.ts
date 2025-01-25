/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import config from "../../app/config";
import catchAsync from "../utils/catchAsync";
import { TLoginUser, TPasswordChang, TResetPass } from "./auth.interface";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body as TLoginUser);
    const {accessToken,refreshToken } = result;

    res.cookie("refreshToken",refreshToken,{
      secure:config.Node_ENV=="production",
      httpOnly:true,
      sameSite:"none",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    return res.status(httpStatus.OK).json({
      success: true,
      message: "logged in successfully",
      data: {
        accessToken,
        refreshToken
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
const createRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies ;
  
    const result = await AuthServices.refreshToken(refreshToken as string);
  
    return res.status(httpStatus.OK).json({
      success: true,
      message: "refresh token  is retrieved successfully",
      data: result,
    });
  });

  const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await AuthServices.forgetPassword(email as string);
  
    return res.status(httpStatus.OK).json({
      success: true,
      message: "reset Link is generated successfully",
      data: result,
    });
  });
  const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers?.authorization;
    const result = await AuthServices.resetPassword(
      req.body as TResetPass,
      token as string
    );
  
    return res.status(httpStatus.OK).json({
      success: true,
      message: "password  reset successful",
      data: result,
    });
  });

  export const AuthControllers={
    loginUser,
    changePassword,
     createRefreshToken,
     forgetPassword,
     resetPassword
  }