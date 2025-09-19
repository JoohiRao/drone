import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  items: [{ type: String, required: true }],
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  otp: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Delivered, Failed
  droneAssigned: { type: Boolean, default: false }, // is a drone delivering this request
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Request", requestSchema);
