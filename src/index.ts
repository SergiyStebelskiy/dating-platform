import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Request URL is wrong" });
  next();
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
