import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    console.log("✅ getUsers controller called");
    console.log("Logged in user id:", req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id },
    }).select("-password");

    console.log("Users found:", users.length);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("❌ getUsers Error:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};