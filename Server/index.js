import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: ["https://memos-manager.onrender.com", "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// 👇 Debug Log 1 - Check if env is loading
console.log("📦 DATABASE_URL from ENV:", process.env.DATABASE_URL);

// 👇 Try connecting to MongoDB with detailed logs
try {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is undefined. Make sure it is set in Render dashboard.");
  }

  await mongoose.connect(process.env.DATABASE_URL);
  console.log("✅ MongoDB connected successfully");
} catch (error) {
  console.error("❌ MongoDB connection failed:");
  console.error(error.message);
}

app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend is Live ✅</h1>");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
