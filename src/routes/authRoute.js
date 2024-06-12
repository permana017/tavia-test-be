import express from "express";
import {
  confirmEmailController,
  forgotPasswordController,
  loginController,
  refreshTokenController,
  registerController,
  resetPasswordController,
} from "../controllers/authController.js";

const authRouter = express();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/confirm/:confirmationCode", confirmEmailController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password/:token", resetPasswordController);
authRouter.post("/refresh-token", refreshTokenController);

export default authRouter;
