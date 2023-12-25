import { Request, Response } from "express";
import { query } from "./../../../database";

export const loginController = async (req: Request, res: Response) => {
  try {
    const data = await query("SELECT * FROM Users;");
    res.json(data);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
