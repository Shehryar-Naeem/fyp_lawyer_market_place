import express from "express";
import {
  authorizeToLawyer,
  isAuthenticatedUser,
} from "../middleware/authUser.js";
import { createGigStep1, createGigStep2 } from "../controller/gigController.js";

const router = express.Router();
router
  .route("/create-gig/step-1")
  .post(isAuthenticatedUser, authorizeToLawyer, createGigStep1);
router
  .route("/create-gig/step-2/:id")
  .put(isAuthenticatedUser, authorizeToLawyer, createGigStep2);

export default router;
