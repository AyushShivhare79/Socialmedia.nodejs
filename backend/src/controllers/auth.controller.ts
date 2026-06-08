import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { HTTP_STATUS } from "../constants/http-status";

export const getMe = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  res.status(HTTP_STATUS.OK).json(user);
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: error,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("Email: ", email);
  try {
    const user = await User.findOne({
      where: { email },
    });
    console.log("Userrrrrrrr: ", user);

    if (!user) {
      return res.json({
        success: false,
        message: "Please signup!",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.dataValues.password,
    );

    if (!isPasswordMatched) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: error,
    });
  }
};
