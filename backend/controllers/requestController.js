import Request from "../models/Request.js";

// Create new user request
export const createRequest = async (req, res) => {
  const { items, location } = req.body;
  if (!items || !items.length || !location) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // Generate random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const request = new Request({
      items,
      location,
      otp,
      status:"Pending",
    });

    await request.save();
    res.status(201).json({ success: true, otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all requests (for admin dashboard)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update request status to Delivered
export const updateRequestStatus = async (req, res) => {
  const { id, otp } = req.body;
  try {
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    request.status = "Delivered";
    await request.save();
    res.json({ message: "Request marked as delivered" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




