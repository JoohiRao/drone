import express from "express";
import { checkDroneDelivery } from "../controllers/droneController.js";

const router = express.Router();

// Drone sends current location
router.post("/update-location", async (req, res) => {
  const { lat, lng } = req.body;
  if (lat === undefined || lng === undefined)
    return res.status(400).json({ message: "Latitude and longitude required" });

  await checkDroneDelivery(lat, lng);
  res.json({ message: "Drone location updated and requests checked" });
});

export default router;
