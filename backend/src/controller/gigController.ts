import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";

const createGig = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, category, price, description, inPerson } = req.body;
    res.status(200).json({
      success: true,
      message: "Gig created successfully",
    });
  }
);

export { createGig };
