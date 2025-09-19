import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-white to-green-100">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 transition-transform duration-500 hover:scale-105">
        Welcome to <span className="text-blue-600">SAHAYAK</span>
      </h1>

      {/* Boxes */}
      <div className="flex gap-16">
        {/* Admin Box */}
        <div
          onClick={() => navigate("/admin/login")}
          className="p-12 w-48 text-center bg-blue-500 text-white text-xl font-semibold rounded-2xl shadow-xl cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-blue-600"
        >
          Admin
        </div>

        {/* User Box */}
        <div
          onClick={() => navigate("/user")}
          className="p-12 w-48 text-center bg-green-500 text-white text-xl font-semibold rounded-2xl shadow-xl cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-green-600"
        >
          User
        </div>
      </div>
    </div>
  );
}

export default HomePage;
