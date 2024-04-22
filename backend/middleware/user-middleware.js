import jwt from "jsonwebtoken";

export const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided " });
  }

  const modifiedToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(modifiedToken, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "user") {
      return res.status(403).json({ message: "Forbidden: User access only" });
    }
    req.userEmail = { email: decodedToken.email };
    req.userId = { id: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const updateUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const modifiedToken = token.split(" ")[1];
  try {
    const decodedToken = jwt.verify(modifiedToken, process.env.JWT_SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp - currentTime < 600) {
      const newToken = jwt.sign(
        {
          email: decodedToken.email,
          id: decodedToken.id,
          role: decodedToken.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.setHeader("Authorization", `Bearer ${newToken}`);
    }
    req.userEmail = { email: decodedToken.email };
    req.userId = { id: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
