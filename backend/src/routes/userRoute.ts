import express from "express";
import { completeLawyerProfile, loginOrCreateUser } from "../controller/userController.js";

const router = express.Router();

router.route("/login-or-register").post(loginOrCreateUser);
router.route("/save-profle/:id").post(completeLawyerProfile);

export default router;