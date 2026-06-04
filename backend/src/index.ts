import express from "express";
import "dotenv/config";
import route from "./routes/index.route";

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hell developer!");
});

app.use("/api/v1", route);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
