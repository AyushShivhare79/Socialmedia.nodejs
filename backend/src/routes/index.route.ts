import express, { Request, Response } from "express";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/me", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Authorize",
  });
});

router.use("/auth", authRouter);

router.use(authMiddleware);

router.use("/post", postRouter);

export default router;
