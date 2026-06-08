import express from "express";
import {
  createComment,
  getCommentByPost,
} from "../controllers/comment.controller";

const router = express.Router();

router.post("/", createComment);
router.get("/", getCommentByPost);

export default router;
