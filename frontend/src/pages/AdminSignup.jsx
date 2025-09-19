import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminSignup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/signup`, {
        name,
        password,
      });
      if (res.data.message) {
        setMessage(res.data.message);
        navigate("/admin/login");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-200 via-green-100 to-green-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Admin Signup
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            Signup
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-blue-700 font-medium animate-fade-in">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/admin/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;
