import express from "express";
import {
  authorizeToLawyer,
  isAuthenticatedUser,
} from "../middleware/authUser.js";
import {
  completeLawyer,
  createLawyer,
} from "../controller/LawyerController.js";

const router = express.Router();

router.route("/create-lawyer-account").post(isAuthenticatedUser, createLawyer);
router
  .route("/complete-lawyer-profile")
  .put(isAuthenticatedUser, authorizeToLawyer, completeLawyer);

export default router;
