import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import cfRoutes from "./routes/cf.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import snapshotRoutes from "./routes/snapshot.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cf", cfRoutes);
app.use("/api/submit", submissionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/snapshots", snapshotRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/cp-platform")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
