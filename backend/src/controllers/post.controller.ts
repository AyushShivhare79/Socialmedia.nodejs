import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { Post } from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const userId = req.user?.id;

  try {
    const post = await Post.create({
      title,
      description,
      userId,
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
  const { title, description, postId } = req.body;

  const userId = req.user?.id;
  try {
    const post = await Post.update(
      {
        title,
        description,
      },
      {
        where: {
          userId,
          id: postId,
        },
      },
    );

    if (!post) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        message: "Something went wrong",
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

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if (!posts) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        data: posts,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: posts,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;

  const userId = req.user?.id;

  try {
    const post = await Post.destroy({
      where: {
        userId,
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
