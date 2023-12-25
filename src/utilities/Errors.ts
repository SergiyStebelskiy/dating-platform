import { Response } from "express";
import { QueryError } from "mysql2";

export class ValidationError extends Error {
  statusCode: number;
  errors: string[];

  constructor(errors: string[] = []) {
    super("Validation failed");
    this.name = "ValidationError";
    this.statusCode = 422;
    this.errors = errors;
  }

  throw(res: Response) {
    res.status(this.statusCode).json({ errors: this.errors });
  }
}

export const throwError =
  (res: Response) => (error: Error | QueryError | unknown) => {
    if (error && typeof error === "object" && "message" in error) {
      let statusCode = 500;
      const extraParams: { code?: string } = {};
      if ("code" in error) {
        switch (error.code) {
          case "ER_DUP_ENTRY":
            statusCode = 409;
            break;
        }
        extraParams["code"] = error.code as string;
      }
      res.status(statusCode).json({ message: error.message, ...extraParams });
    }
  };
