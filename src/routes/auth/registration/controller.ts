import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { QueryError } from "mysql2";
import { IUser, IUserPayload } from "../../../types";
import { query } from "./../../../database";
import { throwError } from "../../../utilities";

const saltRounds = 10;

const getRegistrateUserQuery = ({
  first_name,
  last_name,
  nickname,
  email,
  hash,
  registered_at,
}: IUser): string => `INSERT INTO Users (first_name, last_name, nickname, email, hash, registered_at)
VALUES ('${first_name}', '${last_name}', '${nickname}', '${email}', '${hash}', '${registered_at}');`;

export const registrateController = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, nickname, email, password }: IUserPayload =
      req.body;
    const hash: IUser["hash"] = await bcrypt.hash(password, saltRounds);
    const registeredAt = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const data = await query(
      getRegistrateUserQuery({
        first_name,
        last_name,
        nickname,
        email,
        hash,
        registered_at: registeredAt,
      })
    );
    if (data && "insertId" in data && data.insertId && data.affectedRows) {
      const id = data.insertId;
      const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

      const access_token = await jwt.sign(
        { nickname, email, hash },
        jwtSecretKey,
        { expiresIn: "12h" }
      );

      res.json({ access_token, id });
    }
  } catch (error: Error | QueryError | unknown) {
    throwError(res)(error);
  }
};
