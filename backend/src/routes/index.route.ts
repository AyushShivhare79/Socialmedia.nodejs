import express from "express";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import authMiddleware from "../middlewares/auth.middleware";
import commentRouter from "./comment.route";

const router = express.Router();

router.use("/auth", authRouter);

router.use(authMiddleware);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

export default router;
