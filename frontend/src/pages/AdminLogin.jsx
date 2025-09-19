import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/login`, {
        name,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 via-blue-200 to-blue-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium animate-fade-in">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/admin/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
