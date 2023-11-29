import validationUtilities from ".";
import { USER_PASS_MAX_LENGTH, USER_PASS_MIN_LENGTH } from "../../constants";

type IPasswordResult = {
  isValid: boolean;
  reasons: string[];
};

type IPasswordParams = {
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly isUpperCaseCharRequired?: boolean;
  readonly isSpecialCharRequired?: boolean;
  readonly isNumberCharRequired?: boolean;
};

export const checkIsValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    validationUtilities.types.checkIsValidString(email) &&
    emailRegex.test(email)
  );
};

const defaultParams = {
  minLength: USER_PASS_MIN_LENGTH,
  maxLength: USER_PASS_MAX_LENGTH,
  isUpperCaseCharRequired: false,
  isSpecialCharRequired: false,
  isNumberCharRequired: false,
};

export const getIsValidPasswordWithResult = ({
  password,
  params: {
    minLength = defaultParams.minLength,
    maxLength = defaultParams.maxLength,
    isUpperCaseCharRequired = defaultParams.isUpperCaseCharRequired,
    isSpecialCharRequired = defaultParams.isSpecialCharRequired,
    isNumberCharRequired = defaultParams.isNumberCharRequired,
  } = defaultParams,
}: {
  password: string;
  params?: IPasswordParams;
}): IPasswordResult => {
  const result: IPasswordResult = {
    isValid: true,
    reasons: [],
  };

  const isPasswordValidType =
    validationUtilities.types.checkIsValidString(password);
  if (!isPasswordValidType) {
    result.isValid = false;
    result.reasons.push("Invalid password type");
    return result;
  }

  const passwordRegex = new RegExp(
    `^(?=.*[a-z])${isUpperCaseCharRequired ? "(?=.*[A-Z])" : ""}${
      isNumberCharRequired ? "(?=.*\\d)" : ""
    }${
      isSpecialCharRequired ? '(?=.*[!@#$%^&*(),.?":{}|<>])' : ""
    }[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{${minLength},${maxLength}}$`
  );

  if (!passwordRegex.test(password)) {
    result.isValid = false;

    if (password.length < minLength) {
      result.reasons.push(
        `Password should be at least ${minLength} characters long`
      );
    }

    if (password.length > maxLength) {
      result.reasons.push(
        `Password should be at most ${maxLength} characters long`
      );
    }

    if (isUpperCaseCharRequired && !/(?=.*[A-Z])/.test(password)) {
      result.reasons.push(
        "Password should contain at least one uppercase letter"
      );
    }

    if (isNumberCharRequired && !/(?=.*\d)/.test(password)) {
      result.reasons.push("Password should contain at least one numeric digit");
    }

    if (
      isSpecialCharRequired &&
      !/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)
    ) {
      result.reasons.push(
        "Password should contain at least one special character"
      );
    }
  }

  return result;
};
