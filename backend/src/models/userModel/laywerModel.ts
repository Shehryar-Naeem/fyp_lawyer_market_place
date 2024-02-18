import mongoose from "mongoose";
import { ILawyer } from "../../types/types.js";

const LawyerSchema = new mongoose.Schema<ILawyer>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    availability: {
      officeHours: {
        type: String,
        required: false,
      },
      days: {
        type: [String],
        required: false,
      },
    },
    professionalInfo: {
      lawFirmName: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
      barAdmission: {
        state: {
          type: String,
          required: false,
        },
        liscenseNumber: {
          type: String,
          required: false,
        },
      },
      experience: {
        type: String,
        required: false,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    education: {
      type: String,
      required: false,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    gigs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lawyer = mongoose.model<ILawyer>("Lawyer", LawyerSchema);
export { Lawyer };
