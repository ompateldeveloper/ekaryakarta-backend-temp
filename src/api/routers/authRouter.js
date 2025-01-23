import { Router } from "express";
import { signupValidator } from "../validators/signup-validator.js";
import { authController } from "../controllers/auth-controller.js";
import { signinValidator } from "../validators/signin-validator.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router();
authRouter.post("/signin", signinValidator, authController.signin);
authRouter.post("/signup", signupValidator, authController.signup);
authRouter.post("/logout", authController.logout);
authRouter.get("/me",AuthMiddleware,authController.me);
