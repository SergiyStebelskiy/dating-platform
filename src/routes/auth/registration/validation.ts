import { Request, Response, NextFunction } from "express";
import { utilities } from "../../../utilities";
import { ValidationError } from "../../../utilities/Errors";

const FIRST_NAME_MIN_LENGTH = 2;
const FIRST_NAME_MAX_LENGTH = 255;

const LAST_NAME_MIN_LENGTH = 2;
const LAST_NAME_MAX_LENGTH = 255;

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 255;

const { validationUtilities } = utilities;

export const registrateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, nickname, email, password } = req.body;
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
  if (
    !validationUtilities.types.checkIsValidString(first_name) ||
    !(
      first_name.length >= FIRST_NAME_MIN_LENGTH &&
      first_name.length <= FIRST_NAME_MAX_LENGTH
    )
  ) {
    errors.push(
      `First name is not valid. First name should be string and with ${FIRST_NAME_MIN_LENGTH} <= length <= ${FIRST_NAME_MAX_LENGTH}`
    );
  }

  if (
    !validationUtilities.types.checkIsValidString(last_name) ||
    !(
      last_name.length >= LAST_NAME_MIN_LENGTH &&
      last_name.length <= LAST_NAME_MAX_LENGTH
    )
  ) {
    errors.push(
      `Last name is not valid. First name should be string and with ${LAST_NAME_MIN_LENGTH} <= length <= ${LAST_NAME_MAX_LENGTH}`
    );
  }

  if (
    !validationUtilities.types.checkIsValidString(nickname) ||
    !(
      nickname.length >= NICKNAME_MIN_LENGTH &&
      nickname.length <= NICKNAME_MAX_LENGTH
    )
  ) {
    errors.push(
      `Nickname name is not valid. First name should be string and with ${NICKNAME_MIN_LENGTH} <= length <= ${NICKNAME_MAX_LENGTH}`
    );
  }

  if (!validationUtilities.auth.checkIsValidEmail(email)) {
    errors.push("Email is not valid. Please, verify your email again");
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
