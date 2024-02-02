import express from "express";
import { completeLawyerProfile, getProfleData, loginOrCreateUser, logout, updateProfile } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/authUser.js";

const router = express.Router();

router.route("/login-or-register").post(loginOrCreateUser);
router.route("/logout").get(isAuthenticatedUser,logout);
router.route("/save-profle").post(isAuthenticatedUser,completeLawyerProfile);
router.route("/get-profle").get(isAuthenticatedUser,getProfleData);

router.route("/update-profle").patch(isAuthenticatedUser,updateProfile);

export default router;