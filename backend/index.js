// backend/index.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { socketHandler } from "./controllers/socketHandler.js";  // <-- IMPORT SOCKET HANDLER

// Load environment variables
dotenv.config();

// ----------------- App Setup -----------------
const app = express();
const httpServer = createServer(app);

// ----------------- Middleware -----------------
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ----------------- Database -----------------
const DB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pingpoint";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected Successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// ----------------- Socket.IO -----------------
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 👉 Use your socket handler here
socketHandler(io);

// ----------------- Routes -----------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// ----------------- Root Route -----------------
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
