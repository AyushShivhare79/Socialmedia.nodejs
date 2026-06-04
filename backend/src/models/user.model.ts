import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    dateOfBirth: {
      type: DataTypes.DATE,
    },

    phoneNumber: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    tableName: "users",
  },
);
