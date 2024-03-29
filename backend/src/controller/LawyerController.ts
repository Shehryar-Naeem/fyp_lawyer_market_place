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

    const lawyerProifle = await Lawyer.findOne({ _id: lawyerId });
    if (!lawyerProifle) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }

    const {
      officeHours,
      days,
      youSelf,
      lawFirmName,
      title,
      state,
      liscenseNumber,
      experience,
      education,
    } = req.body;

    lawyerProifle.availability = {
      officeHours,
      days,
    };
    lawyerProifle.yourSelf = youSelf;
    lawyerProifle.professionalInfo = {
      lawFirmName,
      title,
      barAdmission: {
        state,
        liscenseNumber,
      },
      experience,
    };
    lawyerProifle.education = education;
    await lawyerProifle.save();
    res.status(201).json({
      success: true,
      message: "Lawyer created successfully",
      lawyerProifle,
    });
  }
);

const getLawyerProfile = TryCatch(
  async (
    req: IUpdateAuthenticatedLawyerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?._id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const lawyerRoleId = user.roles.find((role) => role.roleType === "lawyer");
    if (!lawyerRoleId) {
      return next(new ErrorHandler("User not found", 404));
    }

    const lawyerId = lawyerRoleId._id;
    const lawyerProifle = await Lawyer.findOne({ _id: lawyerId });

    if (!lawyerProifle) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }

    // Check if all specified fields are filled
    const incompleteFields = checkIncompleteFields(lawyerProifle);

    if (incompleteFields.length > 0) {
      return res.status(200).json({
        success: false,
        message: `Profile is incomplete. Please fill in the following fields: ${incompleteFields.join(
          ", "
        )}`,
        lawyerProifle,
      });
    }

    res.status(201).json({
      success: true,
      lawyerProifle,
    });
  }
);

function checkIncompleteFields(lawyer: any) {
  const incompleteFields: any = [];

  const checkField = (field: any, fieldName: any) => {
    if (field === null || field === undefined) {
      incompleteFields.push(fieldName);
    } else if (Array.isArray(field)) {
      field.forEach((element, index) =>
        checkField(element, `${fieldName}[${index}]`)
      );
    } else if (typeof field === "object") {
      Object.keys(field).forEach((key) =>
        checkField(field[key], `${fieldName}.${key}`)
      );
    }
  };

  Object.keys(lawyer.toObject()).forEach((key) => checkField(lawyer[key], key));

  return incompleteFields;
}

const singalLawyer = TryCatch(
  async (
    req: IUpdateAuthenticatedLawyerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const lawyerId = req.params.id;
    const lawyerProifle = await Lawyer.findOne({ _id: lawyerId });
    if (!lawyerProifle) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }
    res.status(201).json({
      success: true,
      lawyerProifle,
    });
  }
);

const verifytheLawyer = TryCatch(
  async (
    req: IUpdateAuthenticatedLawyerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const lawyerId = req.params.id;
    const lawyerProifle = await Lawyer.findOne({ _id: lawyerId });
    if (!lawyerProifle) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }
    lawyerProifle.isVerified = true;
    await lawyerProifle.save();
    res.status(201).json({
      success: true,
      lawyerProifle,
    });
  }
);

const getAllLawyers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const lawyers = await Lawyer.find();
    res.status(200).json({
      success: true,
      lawyers,
    });
  }
);
const deleteLawyer = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const lawyerId = req.params.id;
    const lawyerProifle = await Lawyer.findByIdAndDelete(lawyerId);
    if (!lawyerProifle) {
      return next(new ErrorHandler("Lawyer not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Lawyer deleted successfully",
    });
  }
);

export {
  completeLawyer,
  createLawyer,
  getLawyerProfile,
  singalLawyer,
  verifytheLawyer,
  deleteLawyer,
  getAllLawyers,
};
