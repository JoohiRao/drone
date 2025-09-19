import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [otpInput, setOtpInput] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/request`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Mark request as Delivered
  const handleDeliver = async (requestId) => {
    if (!otpInput) return setMessage("⚠️ Please enter OTP");

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE}/api/request/deliver`, {
        id: requestId,
        otp: otpInput,
      });
      setMessage(res.data.message);
      setOtpInput("");
      fetchRequests(); // refresh the list
    } catch (err) {
      setMessage(err.response?.data?.message || "Error delivering request");
    }
  };

  // Stats counts
  const activeCount = requests.filter((r) => r.status === "Pending").length;
  const deliveredCount = requests.filter((r) => r.status === "Delivered").length;
  const failedCount = requests.filter((r) => r.status === "Failed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
          Welcome to <span className="text-blue-600">Sahayak 🚁</span>
        </h1>
        <p className="text-gray-600 text-lg">Dashboard overview of requests and deliveries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 p-6 rounded-3xl shadow-lg text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Active Requests</h2>
          <p className="text-4xl font-bold text-gray-900">{activeCount}</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-200 p-6 rounded-3xl shadow-lg text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Delivered</h2>
          <p className="text-4xl font-bold text-gray-900">{deliveredCount}</p>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-200 p-6 rounded-3xl shadow-lg text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Failed Requests</h2>
          <p className="text-4xl font-bold text-gray-900">{failedCount}</p>
        </div>
      </div>

      {/* Active Requests List */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Active Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {requests
          .filter((r) => r.status === "Pending")
          .map((req,idx) => (
            <div
              key={req._id}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Request #{idx+1}</span>
                <span className="text-yellow-700 font-bold px-3 py-1 bg-yellow-100 rounded-full text-sm shadow-sm">
                  Pending
                </span>
              </div>

              {/* Request Details */}
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Requirements:</span> {req.items.join(", ")}
                </p>
                <p>
                  <span className="font-medium">OTP:</span> {req.otp}
                </p>
                <p>
                  <span className="font-medium">Latitude:</span> {req.location.lat}
                </p>
                <p>
                  <span className="font-medium">Longitude:</span> {req.location.lng}
                </p>
              </div>

              {/* OTP Input & Button */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <input
                  type="text"
                  placeholder="Enter OTP to deliver"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-full transition"
                />
                <button
                  onClick={() => handleDeliver(req._id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                >
                  Mark as Delivered
                </button>
              </div>

              {/* Footer */}
              <div className="mt-4 text-sm text-gray-400">Delivered via Drone 🚁</div>
            </div>
          ))}
      </div>

      {message && (
        <p className="mt-8 text-center text-green-700 font-semibold text-lg animate-pulse">{message}</p>
      )}
    </div>
  );
}

export default AdminDashboard;
