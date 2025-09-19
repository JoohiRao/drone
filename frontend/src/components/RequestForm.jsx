import { useState } from "react";
import axios from "axios";

function RequestForm({ location, onOtpGenerated }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItems.length) {
      setMessage("Please select at least one item.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/request`, {
        location,
        items: selectedItems,
      });

      if (res.data.success) {
        onOtpGenerated(res.data.otp);
        setMessage("Request submitted successfully!");
        setSelectedItems([]);
      } else {
        setMessage("Failed to submit request. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    }
  };

  const items = [
    { name: "Insulin", color: "bg-pink-400 hover:bg-pink-500" },
    { name: "Medicine", color: "bg-purple-400 hover:bg-purple-500" },
    { name: "Food Packet", color: "bg-yellow-400 hover:bg-yellow-500" },
    { name: "Bandage Kit", color: "bg-red-400 hover:bg-red-500" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-gradient-to-tr from-white to-green-50 rounded-2xl shadow-xl animate-slide-up">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        Select Required Items
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {items.map((item) => (
          <label
            key={item.name}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition transform hover:scale-105 ${item.color} text-white font-semibold shadow-md`}
          >
            <input
              type="checkbox"
              value={item.name}
              checked={selectedItems.includes(item.name)}
              onChange={handleCheckboxChange}
              className="w-6 h-6 accent-white"
            />
            <span>{item.name}</span>
          </label>
        ))}

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:from-green-600 hover:to-blue-600"
        >
          Submit Request
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-indigo-700 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}

export default RequestForm;
