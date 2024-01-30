import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { User } from "../models/userModel/userModel.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { Laywer } from "../models/userModel/laywerModel.js";
import { Client } from "../models/userModel/clientModel.js";

const loginOrCreateUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;
  const userRole = role || "client";

  const user = await User.findOne({ email });
  if (!user) {
    const newUser = await User.create({
      name,
      email,
      password,
      role :userRole,
    });

    return res.status(201).json({
      success: true,
      message: "user Register Successfully",
      newUser,
    });
  }
  return res.status(201).json({
    success: true,
    message: "user login Successfully",
    user,
  });
};
const completeLawyerProfile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.params.id }).select("+password");

    console.log(user);

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
    }else{
      return next(new ErrorHandler("user not found", 404));
    }
  }
);
const getProfleData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export { loginOrCreateUser, getProfleData, completeLawyerProfile };
