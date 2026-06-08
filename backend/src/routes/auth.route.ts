import { getMe, signIn, signUp } from "../controllers/auth.controller";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

router.get("/me", authMiddleware, getMe);

export default router;
