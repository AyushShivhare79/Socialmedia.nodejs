import express from "express";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

// Public routes (no auth required)
router.use("/auth", authRouter);

// Protected routes (auth required)
router.use(authMiddleware);
router.use("/post", postRouter);

export default router;
