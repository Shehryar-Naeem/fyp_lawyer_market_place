import express from "express";
import {
  CreateUser,
  // completeLawyerProfile,
  deleteUserByAdmin,
  getAllUser,
  getProfleData,
  loginUser,
  logout,
  updateProfile,
} from "../controller/userController.js";
import {
  //  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authUser.js";

const router = express.Router();

router.route("/login-or-register").post(CreateUser);
router.route("/login-user").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logout);
// // router.route("/save-profle").post(isAuthenticatedUser, completeLawyerProfile);
router.route("/get-profle").get(isAuthenticatedUser, getProfleData);

router.route("/update-login-detail").put(isAuthenticatedUser, updateProfile);
// router
//   .route("/get-all-users-by-admin")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
// router
//   .route("/delete-user-by-admin")
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByAdmin);

export default router;

// Path: backend/src/controller/userController.ts
