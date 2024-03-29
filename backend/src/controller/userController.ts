import { NextFunction, Request, Response } from "express";
import {
  AuthenticatedRequest,
  CombinedType,
  IUpdateUser,
  IUser,
  NewUserRequestBody,
  updateAuthenticatedRequest,
} from "../types/types.js";
import sendMail from "../utils/sendMail.js";
import { User } from "../models/userModel/userModel.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/utility-class.js";
import sendToken from "../utils/jwtToken.js";
import crypto from "crypto";

const CreateUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email: {
      $regex: email,
      $options: "i",
    },
  });

  if (!existingUser) {
    const newUser = await User.create({
      name,
      email,

      password,
    });

    const msg: string = "user Register Successfully";

    sendToken(newUser as CombinedType, 201, res, msg);
  } else {
    return next(new ErrorHandler("User already exists", 400));
  }
};

const loginUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const msg: string = "user login Successfully";

    sendToken(user as CombinedType, 200, res, msg);
  }
);

// const completeLawyerProfile = TryCatch(
//   async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const id = req.user?._id;
//     const user = await User.findOne({ _id: id }).select("+password");
//     if (!user) {
//       return next(new ErrorHandler("user not found", 404));
//     }
//     if (user.role === "lawyer") {
//       const {
//         designation,
//         experience,
//         education,
//         phone,
//         yourSelf,
//         address,
//         cnic,
//         gender,
//         dob,
//       } = req.body;
//       if (
//         !designation ||
//         !experience ||
//         !education ||
//         !phone ||
//         !yourSelf ||
//         !address ||
//         !cnic ||
//         !gender ||
//         !dob
//       ) {
//         return next(new ErrorHandler("Please fill all the fields", 404));
//       }
//       const dobDate = new Date(dob);

//       const lawyer = await Laywer.create({
//         user: user._id,
//         designation,
//         experience,
//         education,
//         phone,
//         yourSelf,
//         address,
//         cnic,
//         gender,
//         dob: dobDate,
//       });
//       return res.status(201).json({
//         success: true,
//         message: "profle created Successfully",
//         lawyer,
//       });
//     } else if (user.role === "client") {
//       const {
//         phone,
//         yourSelf,
//         address,
//         cnic,

//         gender,
//         age,
//       } = req.body;
//       if (!phone || !yourSelf || !address || !cnic || !gender || !age) {
//         return next(new ErrorHandler("Please fill all the fields", 404));
//       }

//       const client = await Client.create({
//         user: user._id,
//         phone,
//         yourSelf,
//         address,
//         cnic,
//         gender,
//         age,
//       });
//       return res.status(201).json({
//         success: true,
//         message: "profle created Successfully",
//         client,
//       });
//     } else {
//       return next(new ErrorHandler("user not found", 404));
//     }
//   }
// );

const getProfleData = TryCatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(req.user?._id);
    
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
  async (
    req: updateAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?._id as string;

    try {
      const updatedFields = req.body;

      // Find the user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
        new: true, // Return the updated document
        runValidators: true, // Run validators to ensure data consistency
      });

      if (!updatedUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      // Handle errors, log, and/or return appropriate responses
      console.error(error);
      next(error);
    }
  }
);

const forgetPassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/user/resetpassword/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try {
      await sendMail(user.email, "Password reset token", message);
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler("Email could not be sent", 500));
    }
  }
);

const restPassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  }
);

const updatePasswrord = TryCatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id).select("+password");
    const isMatch = await user?.comparePassword(req.body.oldPassword);
    if (!isMatch) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
    user!.password = req.body.newPassword;

    await user!.save();
    const msg: string = "Password updated successfully";
    sendToken(user as CombinedType, 200, res, msg);
  }
);

const getAllUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    const totalUserLength = await User.countDocuments();
    res.status(200).json({
      success: true,
      message: "All User",
      users,
      totaluser: totalUserLength,
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

export {
  CreateUser,
  loginUser,
  getProfleData,
  logout,
  updateProfile,
  getAllUser,
  deleteUserByAdmin,
  updateProfileByadmin,
  forgetPassword,
  restPassword,
  updatePasswrord,
};
