import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import route from "./routes/index.route";
import { sequelize } from "./config/db";
import cors from "cors";
import authMiddleware from "./middlewares/auth.middleware";
import { User } from "./models/user.model";
import { HTTP_STATUS } from "./constants/http-status";

const app = express();

sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch(console.error);

sequelize.sync();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello developer!");
});

app.use("/api/v1", route);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
