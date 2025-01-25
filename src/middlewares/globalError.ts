/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { TErrorSources } from "../errorInterface/errorInterface";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleMongooseError from "../errors/handleMongooseError";
import handleMongooseDuplicateError from "../errors/handleMongooseDuplicateError";
import handleMongooseCastError from "../errors/handleMongooseCastError";
import AppError from "../errors/appError";
import config from "../app/config";

const globalError : ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";

  let errorSource: TErrorSources = [
    {
      path: "",
      message: "something wend wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSource = simpliFiedError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simpliFiedError = handleMongooseError(err);

    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSource = simpliFiedError?.errorSource;
  } else if (err?.code === 11000) {
    const simpliFiedError = handleMongooseDuplicateError(err);

    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSource = simpliFiedError?.errorSource;
  } else if (err?.name === "CastError") {
    const simpliFiedError = handleMongooseCastError(err);

    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSource = simpliFiedError?.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

    res.status(statusCode).json({
    success: "false",
    message,
    errorSource,
    // err,
    stack: config?.Node_ENV === "development" ? err?.stack : null,
  });
  return
  
};
export default globalError;