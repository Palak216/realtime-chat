import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("🔴 MongoDB Disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🟢 MongoDB Reconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("❌ MongoDB Error:", err.message);
  });
};

export default connectDB;