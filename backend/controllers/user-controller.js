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

  return res.status(201).json({ user });
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
    { name: existingUser.name, email: existingUser.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "login successful", token });
};
