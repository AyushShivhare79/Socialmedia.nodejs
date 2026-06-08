import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./user.model";
import { Post } from "./post.model";

export const Comment = sequelize.define(
  "Comment",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: User,
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: Post,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: true,
    tableName: "comments",
  },
);
