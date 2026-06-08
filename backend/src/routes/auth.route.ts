import { getMe, signIn, signUp } from "../controllers/auth.controller";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

// Public auth routes
router.post("/signin", signIn);
router.post("/signup", signUp);

// Protected auth routes
router.get("/me", authMiddleware, getMe);

export default router;
