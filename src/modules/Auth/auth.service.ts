import config from "../../app/config";
import AppError from "../../errors/appError";
import { UserModel } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
    const { email, password } = payload;
    const user = await UserModel.isUserExistByEmail(email)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user is not found");
    }

    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
    }

    if (!(await UserModel.isPasswordMatched(password, user?.password))) {
      throw new AppError(httpStatus.FORBIDDEN, "wrong password");
    }
    const jwtPayload = {
      userEmail: user?.email,
      role: user?.role,
    };
   
  
    const accessToken = createToken(
        jwtPayload,
        config?.JWT_ACCESS_SECRET as string,
        config?.JWT_ACCESS_EXPIRES_IN as string

      );
  
    return {
      accessToken, 
    };
  };
  export const AuthServices={
    loginUser
  }  