import { NextFunction, Request, Response } from "express";
import { ControllerFunc } from "../types/types.js";
import { ErrorHandler } from "../utils/utility-class.js";


export const errorMiddlerware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  
  if (err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export const TryCatch =
  (func: ControllerFunc) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
