import { Request, Response, NextFunction } from "express";
import validationUtilities from "../../../utilities/validate";
import { ValidationError } from "../../../utilities/Errors";

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const errors = [];
  const passwordCheckResult =
    validationUtilities.auth.getIsValidPasswordWithResult({
      password,
      params: {
        minLength: 8,
        isNumberCharRequired: true,
        isSpecialCharRequired: true,
        isUpperCaseCharRequired: true,
      },
    });
  if (!validationUtilities.auth.checkIsValidEmail(email)) {
    errors.push("Email is not valid");
  }
  if (!passwordCheckResult.isValid) {
    errors.push(...passwordCheckResult.reasons);
  }

  if (!errors.length) {
    next();
  } else {
    new ValidationError(errors).throw(res);
  }
};
