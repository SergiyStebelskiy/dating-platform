import { Router } from "express";
import { loginController, loginValidator } from "./login";

const authRouter = Router();

authRouter.post("/login", loginValidator, loginController);

export default authRouter;
