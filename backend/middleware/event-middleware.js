import jwt from "jsonwebtoken";

export const verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const modifiedToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(modifiedToken, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }
    req.userData = { email: decodedToken.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
