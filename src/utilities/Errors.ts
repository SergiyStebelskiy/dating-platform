import { Response } from "express";

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
