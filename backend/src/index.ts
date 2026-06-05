import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import route from "./routes/index.route";
import { sequelize } from "./config/db";

const app = express();

sequelize.sync();

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
