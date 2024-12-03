import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faLocationDot, faPerson, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import axios from "axios";
import useOutsideClickHandler from "hooks/useOutsideClickHandler";
import { formatDate } from "utils/date-helpers";
import api from "services/axiosApi";

const GlobalSearchBox = () => {
  const navigate = useNavigate();

  // State for location input, autocomplete suggestions, and dropdown visibility
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(""); // State to store hotel.id

  // State for number of guests
  const [numGuests, setNumGuests] = useState();

  // State for date range picker
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // Ref for detecting clicks outside the date picker
  const datePickerRef = useRef();
  useOutsideClickHandler(datePickerRef, () => setIsDatePickerVisible(false));

  // Fetch autocomplete suggestions from the API
  const fetchSuggestions = async (query) => {
    try {
      const response = await api.get(
        `/hotels/autocomplete?query=${query}&language=en`
      );
      setSuggestions(response.data.hotels || []);
      console.log(response.data.hotels)
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle location input changes and fetch suggestions
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (value.trim()) {
      fetchSuggestions(value);
      setIsDropdownVisible(true);
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  };

  // Handle selection of a suggestion from the dropdown
  const handleSelectSuggestion = (hotel) => {
    setLocationInput(hotel.name); // Show hotel name in the input
    setSelectedHotelId(hotel.id); // Store the hotel.id
    setSuggestions([]);
    setIsDropdownVisible(false);
  };

  // Handle number of guests change
  const handleNumGuestsChange = (e) => {
    setNumGuests(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (selectedHotelId && dateRange[0].startDate && dateRange[0].endDate) {
      console.log(selectedHotelId, numGuests, dateRange[0].startDate, dateRange[0].endDate )
      // Navigate to the search results page with input data
      navigate("/hotels", {
        state: {
          location: selectedHotelId,
          numGuests,
          dateRange: {
            startDate: formatDate(dateRange[0].startDate),
            endDate: formatDate(dateRange[0].endDate),
          },
        },
      });
    } else {
      alert("Please fill in all the fields.");
    }
  };

  // Handle date picker visibility toggle
  const toggleDatePicker = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap flex-col lg:flex-row hero-content__search-box">
      {/* Location Input with Autocomplete */}
      <div className="relative w-full lg:w-auto lg:mb-0">
        <div className="relative">
          <input
            type="text"
            value={locationInput}
            onChange={handleLocationChange}
            placeholder="Enter location"
            className="w-full pl-7 pr-3 py-2 border-2 border-brand-secondary text-black"
          />
          <FontAwesomeIcon
            icon={faLocationDot}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]"
          />
        </div>
        {isDropdownVisible && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
            {suggestions.map((hotel) => (
              <li
                key={hotel.id}
                onClick={() => handleSelectSuggestion(hotel)}
                className="p-3 text-black hover:bg-[#074498] hover:text-white cursor-pointer"
              >
                {hotel.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Range Picker */}
      <div ref={datePickerRef} className="relative w-full lg:w-auto lg:mb-0">
        <div className="flex">
        <FontAwesomeIcon
            icon={faCalendar}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]"
            onClick={toggleDatePicker}
          />
          <input
  type="text"
  value={dateRange[0].startDate ? formatDate(dateRange[0].startDate) : ""}
  onClick={toggleDatePicker}
  readOnly
  placeholder="Check-in"
  className="w-1/2 pl-7 pr-3 py-2 border-2 border-brand-secondary cursor-pointer text-black"
/>
<input
  type="text"
  value={dateRange[0].endDate ? formatDate(dateRange[0].endDate) : ""}
  onClick={toggleDatePicker}
  readOnly
  placeholder="Check-out"
  className="w-1/2 pl-7 pr-3 py-2 border-2 border-brand-secondary cursor-pointer text-black"
/>

        </div>
        {isDatePickerVisible && (
          <DateRange
            editableDateInputs
            onChange={(range) => setDateRange([range.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={new Date()}
            direction="horizontal"
            className="absolute z-20 mt-2 shadow-lg bg-white border"
          />
        )}
      </div>

      {/* Number of Guests Input */}
      <div className="relative w-full lg:w-auto mb-0">
        <input
          type="number"
          value={numGuests}
          onChange={handleNumGuestsChange}
          // min="1"
          placeholder="No. of guests"
          className="w-full pl-7 pr-3 py-2 border-2 border-brand-secondary text-black"
        />
        <FontAwesomeIcon
          icon={faPerson}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]"
        />
      </div>

      {/* Search Button */}
      <button
        className="w-full md:w-auto sb__button--secondary bg-brand-secondary hover:bg-yellow-600 px-4 py-2 text-white"
        onClick={handleSearch}
      >
        SEARCH
      </button>
    </div>
  );
};

export default GlobalSearchBox;
