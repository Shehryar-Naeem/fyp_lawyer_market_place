import mongoose from "mongoose";

const gigsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title for the gig"],
    },
    description: {
      type: String,
      required: [true, "Please enter description for the gig"],
    },
    budget: {
      type: Number,
      required: [true, "Please enter budget for the gig"],
    },
    category: {
      type: String,
      required: [true, "Please enter category for the gig"],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("Gig", gigsSchema);
export { Gig };
