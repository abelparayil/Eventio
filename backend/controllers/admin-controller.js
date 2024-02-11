import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingAdmin, token });
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
    const result = await newAdmin.save();
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
