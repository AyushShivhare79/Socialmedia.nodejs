import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { Post } from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const post = await Post.create({
      title,
      description,
    });

    if (!post) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        message: "Post not published",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  const {} = req.body;
  try {
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  try {
    const post = await Post.destroy({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        message: "Post not published",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post deleted successful",
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
