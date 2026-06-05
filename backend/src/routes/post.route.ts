import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
} from "../controllers/post.controller";
import express from "express";

const router = express.Router();

router.post("/create", createPost);
router.get("/", getAllPosts);
router.delete("/", deletePost);
router.put("/edit", editPost);

export default router;
