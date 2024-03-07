import mongoose from "mongoose";
const pricingAndServiceSchema = new mongoose.Schema({
  basic: {
    price: {
      type: Number,
      required: [true, "Please enter basic price for the gig"],
    },
    services: {
      includedFeatures: {
        type: [String],
        default: [],
      },
      duration: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  standard: {
    price: {
      type: Number,
      required: [true, "Please enter basic price for the gig"],
    },
    services: {
      includedFeatures: {
        type: [String],
        default: [],
      },
      duration: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  premium: {
    price: {
      type: Number,
      required: [true, "Please enter basic price for the gig"],
    },
    services: {
      includedFeatures: {
        type: [String],
        default: [],
      },
      duration: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  additionalCosts: {
    type: [String],
    default: [],
  },
});
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
    pricing: {
      type: pricingAndServiceSchema,
      required: true,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter category for the gig"],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
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
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("Gig", gigsSchema);
export { Gig };
