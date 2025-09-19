import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import droneRoutes from "./routes/droneRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/drone", droneRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
