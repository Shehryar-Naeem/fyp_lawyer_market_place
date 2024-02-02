import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/utility-class.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel/userModel.js";
import { TryCatch } from "./error.js";
import { AuthenticatedRequest, DecodedJwtPayload } from "../types/types.js";

export const isAuthenticatedUser = TryCatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("Login first to access this resource.", 401)
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedJwtPayload;
    req.user = await User.findById(decoded.id);
    next();
  }
);
