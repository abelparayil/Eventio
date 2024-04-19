import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    (name && name.trim() === "") ||
    !email ||
    (email && email.trim() === "") ||
    !password ||
    (password && password.trim() === "")
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;

  if (
    !email ||
    (email && email.trim() === "") ||
    !password ||
    (password && password.trim() === "")
  ) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User doens't exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      email: existingUser.email,
      id: existingUser._id,
      name: existingUser.name,
      role: "user",
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res
    .status(200)
    .json({
      message: "login successful",
      token,
      name: existingUser.name,
      email: existingUser.email,
    });
};

export const resetPassword = async (req, res, next) => {
  const userId = req.userId.id;
  const newPassword = req.body.newPassword;

  let existingUser;

  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const hashedPassword = bcrypt.hashSync(newPassword);

  try {
    existingUser.password = hashedPassword;
    existingUser = await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!existingUser) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ message: "Password reset successful" });
};

export const isUser = async (req, res, next) => {
  return res
    .status(200)
    .json({ message: "User is authenticated", isUser: true });
};
