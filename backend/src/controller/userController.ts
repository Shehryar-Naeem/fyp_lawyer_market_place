import { NextFunction, Request, Response } from "express";
import {
  AuthenticatedRequest,
  CombinedType,
  IUpdateUser,
  IUser,
  NewUserRequestBody,
  updateAuthenticatedRequest,
} from "../types/types.js";
import { User } from "../models/userModel/userModel.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { Laywer } from "../models/userModel/laywerModel.js";
import { Client } from "../models/userModel/clientModel.js";
import sendToken from "../utils/jwtToken.js";
import { exit } from "process";

const loginOrCreateUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;
  const userRole = role || "client";

  const existingUser = await await User.findOne({
    email: {
      $regex: email,
      $options: "i",
    },
  }).select("+password");

  if (!existingUser) {
    const newUser = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    const msg: string = "user Register Successfully";

    sendToken(newUser as CombinedType, 201, res, msg);
  } else {
    const isPasswordMatched = await existingUser.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const msg: string = "user login Successfully";

    sendToken(existingUser as CombinedType, 201, res, msg);
  }
};

const completeLawyerProfile = TryCatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.user?._id;
    const user = await User.findOne({ _id: id }).select("+password");
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    if (user.role === "lawyer") {
      const {
        designation,
        experience,
        education,
        phone,
        yourSelf,
        address,
        cnic,
        gender,
        dob,
      } = req.body;
      if (
        !designation ||
        !experience ||
        !education ||
        !phone ||
        !yourSelf ||
        !address ||
        !cnic ||
        !gender ||
        !dob
      ) {
        return next(new ErrorHandler("Please fill all the fields", 404));
      }
      const dobDate = new Date(dob);

      const lawyer = await Laywer.create({
        user: user._id,
        designation,
        experience,
        education,
        phone,
        yourSelf,
        address,
        cnic,
        gender,
        dob: dobDate,
      });
      return res.status(201).json({
        success: true,
        message: "profle created Successfully",
        lawyer,
      });
    } else if (user.role === "client") {
      const {
        phone,
        yourSelf,
        address,
        cnic,

        gender,
        age,
      } = req.body;
      if (!phone || !yourSelf || !address || !cnic || !gender || !age) {
        return next(new ErrorHandler("Please fill all the fields", 404));
      }

      const client = await Client.create({
        user: user._id,
        phone,
        yourSelf,
        address,
        cnic,
        gender,
        age,
      });
      return res.status(201).json({
        success: true,
        message: "profle created Successfully",
        client,
      });
    } else {
      return next(new ErrorHandler("user not found", 404));
    }
  }
);

const getProfleData = TryCatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.user?._id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "profle Successfully fetched",
      user,
    });
  }
);
const logout = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
);
const updateProfile = TryCatch(
  async (req: updateAuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.user?._id as string;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const updatedFields = req.body;

    Object.keys(updatedFields).forEach((key) => {
      // Use type assertion here if necessary
      (user as any)[key] = updatedFields[key];
    });

    // Save the updated user
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  }
);

const getAllUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    const totalUserLength  =await User.countDocuments();
    res.status(200).json({
      success: true,
      message: "All User",
      users,
      totaluser:totalUserLength
    });
  }
);
const updateProfileByadmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const updatedFields = req.body;

    Object.keys(updatedFields).forEach((key) => {
      // Use type assertion here if necessary
      (user as any)[key] = updatedFields[key];
    });

    // Save the updated user
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  }
);
const deleteUserByAdmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  }
);
export {loginOrCreateUser,getProfleData,completeLawyerProfile,logout,updateProfile,getAllUser,deleteUserByAdmin,updateProfileByadmin};
