import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASSWORD,
    },
  });

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

  const emailRegex = /^[\w-]+(\.[\w-]+)*@vitbhopal\.ac\.in$/i;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email. Please use your VIT Bhopal email." });
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
    user = new User({ name, email, password: hashedPassword, verificationCode });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  const mailOptions = {
    from: process.env.BREVO_USER,
    to: email,
    subject: "Account Verification",
    text: `Your verification code is ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  user = await user.save();
  return res
    .status(201)
    .json({ message: "User created successfully. Check your email for verification" });
};


export const verifyUser = async (req, res, next) => {
  const { email, verificationCode } = req.body;

  if (
    !email ||
    (email && email.trim() === "") ||
    !verificationCode ||
    (verificationCode && verificationCode.trim() === "")
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
    return res.status(404).json({ message: "User doesn't exist" });
  }

  if (existingUser.verificationCode !== verificationCode) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  existingUser.verified = true;

  try {
    existingUser = await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!existingUser) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ message: "User verified successfully" });
};

export const resendVerificationCode = async (req, res, next) => {
  const email = req.body.email;

  if (!email || (email && email.trim() === "")) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  existingUser.verificationCode = verificationCode;

  try {
    existingUser = await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!existingUser) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  const mailOptions = {
    from: process.env.SENDGRID_USERNAME,
    to: email,
    subject: "Account Verification",
    text: `Your verification code is ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({ message: "Verification code sent successfully" });
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
    process.env.JWT_SECRET_KEY
  );

  return res.status(200).json({
    message: "login successful",
    token,
    name: existingUser.name,
    email: existingUser.email,
  });
};
export const verifyUser = async (req, res, next) => {
  const { email, verificationCode } = req.body;

  if (
    !email ||
    (email && email.trim() === "") ||
    !verificationCode ||
    (verificationCode && verificationCode.trim() === "")
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
    return res.status(404).json({ message: "User doesn't exist" });
  }

  if (existingUser.verificationCode != verificationCode) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  existingUser.verified = true;

  try {
    existingUser = await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!existingUser) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ message: "User verified successfully" });
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
  return res.status(200).json({ message: "User is authenticated", isUser: true });
};
