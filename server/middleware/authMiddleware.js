import jwt from "jsonwebtoken";

console.log("✅ authMiddleware loaded");

const authMiddleware = (req, res, next) => {
  console.log("🔥 authMiddleware called");

  try {
    console.log("====================================");
    console.log("Authorization Header:");
    console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer Token Found");

      return res.status(401).json({
        success: false,
        message: "Access Denied",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("✅ Token:");
    console.log(token);

    console.log("✅ JWT Secret:");
    console.log(process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded User:");
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("❌ JWT ERROR");
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;