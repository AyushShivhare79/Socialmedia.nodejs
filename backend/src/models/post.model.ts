import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./user.model";

export const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "posts",
  },
);
