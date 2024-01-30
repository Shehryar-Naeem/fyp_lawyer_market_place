import mongoose from "mongoose";
import validator from "validator";
import { IUser, ILawyer } from "../../types/types.js";

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: [true, "Please Enter Your ID"],
    //   unique: true,
    // },
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["client", "lawyer", "admin"],
      default: "client",
      required: [true, "Please Enter Your Role"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
        default: "3292||stalah",
      },
      url: {
        type: String,
        default:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3yZ4ihZhlPWhab5e20wjxe&ust=1681274559120000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMif9PeBof4CFQAAAAAdAAAAABAE",
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
   
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model<IUser>("User", userSchema);

export { User };
