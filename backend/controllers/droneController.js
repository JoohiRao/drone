import Request from "../models/Request.js";

// Simulate drone delivery
// droneLat, droneLng = current drone location
export const checkDroneDelivery = async (droneLat, droneLng) => {
  try {
    // Find active requests which are not delivered and assigned to drone
    const activeRequests = await Request.find({ status: "Pending", droneAssigned: false });

    for (let req of activeRequests) {
      const distance = getDistance(req.location.lat, req.location.lng, droneLat, droneLng);
      if (distance < 0.05) { // threshold ~50 meters
        req.status = "Delivered";
        req.droneAssigned = true;
        await req.save();
        console.log(`Request ${req._id} delivered!`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


// Verify OTP when drone delivers
export const verifyOtp = async (req, res) => {
  const { requestId, enteredOtp } = req.body;

  try {
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    if (request.otp === enteredOtp) {
      request.status = "Delivered";
      await request.save();
      return res.json({ success: true, message: "OTP verified, package delivered" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
