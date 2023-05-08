import mongoose from "mongoose";
const UserScehma = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    address: [
      {
        detail: {
          type: String,
        },
        for: {
          type: String,
        },
      },
    ],
    contact: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const UserModel = mongoose.model("Users", UserScehma);
