import React, { useState } from "react";
import axios from "axios";

const HotelDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotelData = async () => {
    const payload = {
      id: "good_night_3",
      checkin: "2024-12-20",
      checkout: "2024-12-26",
      language: "en",
      guests: [
        {
          adults: 2,
          children: [],
        },
      ],
    };

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "https://hotelrev-backend.onrender.com/hotels/page",
        payload
      );
      setData(response.data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Hotel Data Fetcher</h1>
      <button
        onClick={fetchHotelData}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Hotel Data
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Hotels:</h2>
          {data.hotels.map((hotel, index) => (
            <div
              key={index}
              className="border rounded p-4 mb-4 shadow-sm bg-gray-100"
            >
              <p className="font-medium">Hotel ID: {hotel.id}</p>
              <p>HID: {hotel.hid}</p>
              <div className="mt-2">
                <h3 className="font-semibold">Rates:</h3>
                {hotel.rates.map((rate, idx) => (
                  <div key={idx} className="pl-4 border-l mt-2">
                    <p>Book Hash: {rate.book_hash}</p>
                    <p>Meal: {rate.meal}</p>
                    <p>Daily Prices: {rate.daily_prices.join(", ")}</p>
                    <p>Amount: {rate.payment_options.payment_types[0].amount}</p>
                    <p>
                      Free Cancellation Before: {
                        rate.payment_options.payment_types[0].cancellation_penalties
                          .free_cancellation_before
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelDataComponent;
