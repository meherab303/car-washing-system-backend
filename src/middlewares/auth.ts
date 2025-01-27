import { NextFunction, Request, Response } from "express";

import catchAsync from "../modules/utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";
import { TUserRole } from "../modules/User/user.interface";
import { UserModel } from "../modules/User/user.model";

const auth = (...UserRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }
    const decoded = jwt.verify(token, config?.JWT_ACCESS_SECRET as string);
    const { userEmail, role, iat } = decoded as JwtPayload;
    const user = await UserModel.isUserExistByEmail(userEmail as string);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user is not found");
    }

    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "user is deleted");
    }

    if (UserRoles.length > 0 && !UserRoles.includes(role as TUserRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
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

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
