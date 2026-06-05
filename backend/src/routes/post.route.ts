import {
  createPost,
  deletePost,
  editPost,
} from "../controllers/post.controller";
import express from "express";

const router = express.Router();

router.post("/create", createPost);
router.get("/", editPost);
router.delete("/", deletePost);
router.put("/edit", editPost);

export default router;
