import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function GoogleMapPicker({ setLocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setLocation({ lat, lng });
      });
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  if (!isLoaded)
    return <p className="text-gray-600 font-medium">Loading map...</p>;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={getLocation}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform transition hover:scale-105"
      >
        Get My Location
      </button>

      {coords && (
        <div className="flex flex-col gap-2">
          <p className="text-gray-700 font-medium">
            Latitude: {coords.lat}, Longitude: {coords.lng}
          </p>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={14}
            >
              <Marker position={coords} />
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleMapPicker;
