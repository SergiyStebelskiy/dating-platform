import express, { Application } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Request URL is wrong" });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
