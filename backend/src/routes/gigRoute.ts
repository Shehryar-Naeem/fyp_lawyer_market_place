import express from "express";
import {
  authorizeToLawyer,
  isAuthenticatedUser,
} from "../middleware/authUser.js";
import { createGig } from "../controller/gigController.js";

const router = express.Router();
router
  .route("/create-gig")
  .post(isAuthenticatedUser, authorizeToLawyer, createGig);

export default router;
