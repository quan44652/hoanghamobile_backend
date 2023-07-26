import User from "../models/user";
import { object, string, ref } from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupSchema = new object({
  email: string().required(),
  name: string().required(),
  password: string().required(),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Mật khẩu phải trùng khớp")
    .required(),
});

const signinSchema = new object({
  email: string().required(),
  password: string().required(),
});

const signup = async (req, res) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    const { name, email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.json({
        error: "Tài khoản đã tồn tại !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    const token = await jwt.sign({ _id: user._id }, "anhquan", {
      expiresIn: "7d",
    });
    return res.json({
      message: "Đăng ký thành công",
      user,
      accsetToken: token,
    });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const signin = async (req, res) => {
  try {
    await signinSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        error: "Tài khoản chưa tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        error: "Mật khẩu không đúng !",
      });
    }

    const token = jwt.sign({ _id: user._id }, "anhquan", {
      expiresIn: "7d",
    });

    return res.json({
      message: "Đăng nhập thành công",
      user,
      accsetToken: token,
    });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const licensing = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: "admin",
    });
    return res.json({ user, message: "Cấp quyền thành công !!" });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "Xóa thành công !!" });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export { signup, signin, getAllUser, licensing, removeUser };
