import catchAsync from "../utils/catchAsync";
import { TLoginUser } from "./auth.interface";
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
  export const AuthControllers={
    loginUser
  }