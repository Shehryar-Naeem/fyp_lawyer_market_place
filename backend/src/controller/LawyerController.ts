import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { IUpdateAuthenticatedLawyerRequest } from "../types/types.js";
import { User } from "../models/userModel/userModel.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { Lawyer } from "../models/userModel/laywerModel.js";
import mongoose from "mongoose";

const createLawyer = TryCatch(
  async (
    req: IUpdateAuthenticatedLawyerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    const hasLawyerRole = user.roles.some((role) => role.roleType === "lawyer");

    if (hasLawyerRole) {
      return next(new ErrorHandler("Lawyer already exists", 400));
    }
    const lawyerId = new mongoose.Types.ObjectId();
    user.roles.push({ _id: lawyerId, roleType: "lawyer" });

    await user.save();
    const lawyer = new Lawyer({ _id: lawyerId, user: user?._id });
    await lawyer.save();
    res.status(201).json({
      success: true,
      message: "Lawyer created successfully",
    });
  }
);

const completeLawyer = TryCatch(
  async (
    req: IUpdateAuthenticatedLawyerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?._id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    const lawyerRoleId = user.roles.find((role) => role.roleType === "lawyer");
    if (!lawyerRoleId) {
      return next(new ErrorHandler("user not found", 404));
    }
    const lawyerId = lawyerRoleId._id;

    const findLawyer = await Lawyer.findOne({ _id: lawyerId });
    if (!findLawyer) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }
    const {
      phoneNumber,
      professionalInfo,
      isVerified,
      availability,
      education,
    } = req.body;
    findLawyer.phoneNumber = phoneNumber;
    findLawyer.professionalInfo = professionalInfo;
    findLawyer.isVerified = isVerified;
    findLawyer.availability = availability;
    findLawyer.education = education;
    await findLawyer.save();
    res.status(200).json({
      success: true,
      message: "Lawyer profile updated successfully",
    });
  }
);

export { completeLawyer, createLawyer };
