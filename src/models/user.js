import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    status: {
      type: String,
      default: "on",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
