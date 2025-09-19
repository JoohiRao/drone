import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import droneRoutes from "./routes/droneRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/drone", droneRoutes);

// ✅ Serve frontend only in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all middleware for React Router
  app.use((req, res, next) => {
    // Only handle GET requests
    if (req.method === "GET") {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      next();
    }
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
