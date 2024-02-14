import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      existingAdmin.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id, role: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ email, password: hashedPassword });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const adminId = req.adminId.id;
  const newPassword = req.body.newPassword;

  let existingAdmin;

  try {
    existingAdmin = await Admin.findById(adminId);
  } catch (err) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const hashedPassword = bcrypt.hashSync(newPassword);

  try {
    existingAdmin.password = hashedPassword;
    existingAdmin = await existingAdmin.save();
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!existingAdmin) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ message: "Password reset successful" });
};
