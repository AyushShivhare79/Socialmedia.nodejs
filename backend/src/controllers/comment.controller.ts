import { Request, Response } from "express";
import { Comment } from "../models/comment.model";
import { HTTP_STATUS } from "../constants/http-status";

export const createComment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { postId, comment } = req.body;

  try {
    const response = await Comment.create({
      userId,
      postId,
      comment,
    });

    if (!response) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Your comment was posted successfully",
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.OK).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getCommentByPost = async (req: Request, res: Response) => {
  const { postId } = req.query;

  try {
    const comment = await Comment.findAll({
      where: {
        postId,
      },
    });

    if (!comment) {
      return res.status(HTTP_STATUS.OK).json({
        success: false,
        message: "Comments not found",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: comment,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.OK).json({
      success: false,
      message: error?.message,
    });
  }
};
