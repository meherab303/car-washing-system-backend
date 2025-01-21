/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const statusCode = 500;
  const message = err.message || "something went wrong";

  return res.status(statusCode).json({
    success: "false",
    message,
    error: err,
  });
};
export default globalError;
