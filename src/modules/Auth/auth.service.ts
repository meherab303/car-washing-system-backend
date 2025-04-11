import config from "../../app/config";
import AppError from "../../errors/appError";
import { UserModel } from "../User/user.model";
import { TLoginUser, TPasswordChang, TResetPass } from "./auth.interface";
import httpStatus from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await UserModel.isUserExistByEmail(email);

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
    config?.JWT_ACCESS_EXPIRES_IN as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config?.jwt_refresh_secret as string,
    config?.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (user: JwtPayload, payload: TPasswordChang) => {
  const { userEmail, role } = user;

  const { oldPassword, newPassword } = payload;
  const userData = await UserModel.isUserExistByEmail(userEmail as string);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "user is not found");
  }
  const isUserDeleted = userData?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  if (!(await UserModel.isPasswordMatched(oldPassword, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "wrong password");
  }

  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    Number(config.SALT_ROUND),
  );

  await UserModel.findOneAndUpdate(
    {
      email: userEmail as string,
      role: role as string,
    },
    {
      password: hashedNewPassword,
      passwordChangeAt: new Date(),
    },
    {
      runValidators: true,
      new: true,
    },
  );
  return null;
};
const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  );
  const { userEmail, iat } = decoded as JwtPayload;
  const user = await UserModel.isUserExistByEmail(userEmail as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user is not found");
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const passWordChangeTime = user?.passwordChangeAt;
  if (
    passWordChangeTime &&
    UserModel.isJWTissuedBeforePasswordChanged(
      passWordChangeTime,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config?.JWT_ACCESS_SECRET as string,
    config?.JWT_ACCESS_EXPIRES_IN as string,
  );
  return accessToken;
};
const forgetPassword = async (userEmail: string) => {
  const user = await UserModel.isUserExistByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user is not found");
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }

  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config?.JWT_ACCESS_SECRET as string,
    config?.JWT_ACCESS_EXPIRES_IN as string,
  );

  const resetUiLink = `${config.jwt_Reset_ui_link}/reset-password?email=${user.email}&token=${resetToken}`;

  await sendEmail(user.email, resetUiLink);
};
const resetPassword = async (payload: TResetPass, token: string) => {
  const user = await UserModel.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user is not found");
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
  }
  const decoded = verifyToken(
    token,
    config.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;

  if (user.email !== decoded.userEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "you are forbidden");
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.SALT_ROUND),
  );
  await UserModel.findOneAndUpdate(
    { email: decoded.userEmail as string, role: decoded.role as string },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
    },
    {
      runValidators: true,
      new: true,
    },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

// http://localhost:3000?email=nahinrahman87@gmail.com&token
