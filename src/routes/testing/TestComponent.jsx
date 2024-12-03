import React, { useState } from "react";
import axios from "axios";

const TestComponent = () => {
  const [query, setQuery] = useState(""); // Input value
  const [suggestions, setSuggestions] = useState({ hotels: [], regions: [] }); // Suggestions from API
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fetch suggestions from API
  const fetchSuggestions = async (searchText) => {
    try {
      if (searchText.trim()) {
        const response = await axios.get(
          `https://hotelrev-backend.onrender.com/hotels/autocomplete?query=${searchText}&language=en`
        );
        setSuggestions(response.data || { hotels: [], regions: [] });
      } else {
        setSuggestions({ hotels: [], regions: [] });
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
    setIsDropdownVisible(value.trim().length > 0);
  };

  // Handle item selection
  const handleSelect = (item, type) => {
    const selectedValue = type === "hotel" ? item.name : item.name;
    setQuery(selectedValue);
    setSuggestions({ hotels: [], regions: [] });
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for hotels or regions..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown */}
      {isDropdownVisible && (suggestions.hotels.length > 0 || suggestions.regions.length > 0) && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
          {/* Hotels */}
          {suggestions.hotels.length > 0 && (
            <li className="p-3 bg-gray-100 font-semibold text-gray-700">Hotels</li>
          )}
          {suggestions.hotels.map((hotel) => (
            <li
              key={hotel.id}
              onClick={() => handleSelect(hotel, "hotel")}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
              {hotel.name}
            </li>
          ))}

          {/* Regions */}
          {suggestions.regions.length > 0 && (
            <li className="p-3 bg-gray-100 font-semibold text-gray-700">Regions</li>
          )}
          {suggestions.regions.map((region) => (
            <li
              key={region.id}
              onClick={() => handleSelect(region, "region")}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
              {region.name} ({region.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestComponent;
