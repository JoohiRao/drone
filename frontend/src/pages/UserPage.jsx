import { useState } from "react";
import GoogleMapPicker from "../components/GoogleMapPicker";
import RequestForm from "../components/RequestForm";
import OtpDisplay from "../components/OtpDisplay";

function UserPage() {
  const [otp, setOtp] = useState(null);
  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 animate-fade-in">
        Request Emergency Supplies
      </h2>

      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Google Map Component */}
        <div className="p-4 bg-white shadow-lg rounded-xl animate-slide-up">
          <GoogleMapPicker setLocation={setLocation} />
        </div>

        {/* Request Form appears only when location is selected */}
        {location && (
          <div className="p-4 bg-white shadow-lg rounded-xl animate-slide-up delay-150">
            <RequestForm
              location={location}
              onOtpGenerated={(otp) => setOtp(otp)}
            />
          </div>
        )}

        {/* OTP Display */}
        {otp && (
          <div className="p-4 bg-white shadow-lg rounded-xl animate-slide-up delay-300">
            <OtpDisplay otp={otp} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
