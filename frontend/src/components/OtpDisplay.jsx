// components/OtpDisplay.jsx
function OtpDisplay({ otp }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-100 to-blue-50 rounded-2xl shadow-lg animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        Your One-Time Password (OTP)
      </h3>
      <p className="text-5xl font-extrabold text-blue-600 tracking-widest drop-shadow-lg">
        {otp}
      </p>
      <p className="mt-3 text-gray-600 text-sm">
        Share this OTP with the drone when it arrives to receive your supplies 🚁
      </p>
    </div>
  );
}

export default OtpDisplay;
