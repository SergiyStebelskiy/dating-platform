import { Router } from "express";
import { loginController, loginValidator } from "./login";
import { registrateController, registrateValidator } from "./registration";

const authRouter = Router();

authRouter.post("/login", loginValidator, loginController);
authRouter.post("/registrate", registrateValidator, registrateController);

export default authRouter;
