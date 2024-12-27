import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPerson, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import { formatDate } from 'utils/date-helpers';
import api from 'services/axiosApi';

const GlobalSearchBox = () => {
  const navigate = useNavigate();

  // States
  const [locationInput, setLocationInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [numGuests, setNumGuests] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);

    // Ref for detecting clicks outside the date picker
  const datePickerRef = useRef();
  useOutsideClickHandler(datePickerRef, () => setIsDatePickerVisible(false));

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (query) => {
    try {
      const response = await api.get(`/hotels/autocomplete?query=${query}&language=en`);
      const { hotels = [], regions = [] } = response.data;
      setSuggestions([
        ...hotels.map((h) => ({ id: h.id, name: h.name, type: 'hotel' })),
        ...regions.map((r) => ({ id: r.id, name: r.name, type: 'region' })),
      ]);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  // Handle search button
  const handleSearch = () => {
    if (selectedSuggestion && dateRange[0].startDate && dateRange[0].endDate && numGuests) {
    console.log(selectedSuggestion.id, selectedSuggestion.type, formatDateToISO(formatDate(dateRange[0].endDate)), numGuests, formatDateToISO(formatDate(dateRange[0].startDate)))
      navigate('/hotels', {
        state: {
          id: selectedSuggestion.id,
          type: selectedSuggestion.type,
          checkin: formatDateToISO(formatDate(dateRange[0].startDate)),
          checkout: formatDateToISO(formatDate(dateRange[0].endDate)),
          language: 'en',
          numGuests,
          page: 1,
          limit: 10,
        },
      });
    } else {
      alert('Please fill in all the fields.');
    }
  };

  return (
    <div className="flex flex-wrap flex-col lg:flex-row hero-content__search-box">
      {/* Location Input */}
      <LocationInput
        value={locationInput}
        onChange={setLocationInput}
        suggestions={suggestions}
        onFetchSuggestions={fetchSuggestions}
        onSelectSuggestion={setSelectedSuggestion}
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
      />

      {/* Date Range Picker */}
      <DateRangePicker
        dateRange={dateRange}
        setDateRange={setDateRange}
        isVisible={isDatePickerVisible}
        toggleVisibility={setIsDatePickerVisible}
        ref={datePickerRef}
      />

      {/* Guests Input */}
      <GuestInput value={numGuests} onChange={setNumGuests} />

      {/* Search Button */}
      <SearchButton onSearch={handleSearch} />
    </div>
  );
};

export default GlobalSearchBox;

// Location Input Component
const LocationInput = ({ value, onChange, suggestions, onFetchSuggestions, onSelectSuggestion, isDropdownVisible, setIsDropdownVisible }) => (
  <div className="relative w-full lg:w-auto lg:mb-0">
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        if (e.target.value.trim()) {
          onFetchSuggestions(e.target.value);
          setIsDropdownVisible(true);
        } else {
          setIsDropdownVisible(false);
        }
      }}
      placeholder="Enter location"
      className="w-full pl-7 pr-3 py-2 border-2 border-brand-secondary text-black"
    />
    <FontAwesomeIcon icon={faLocationDot} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]" />
    {isDropdownVisible && suggestions.length > 0 && (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
        {suggestions.map((s) => (
          <li
            key={s.id}
            onClick={() => {
              onChange(s.name); // Update the input field with the clicked suggestion
              onSelectSuggestion(s); // Set the selected suggestion
              setIsDropdownVisible(false); // Hide the dropdown
            }}
            className="p-3 text-black hover:bg-[#074498] hover:text-white cursor-pointer"
          >
            {s.name} <span className="text-sm text-gray-500">({s.type})</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);


// Date Range Picker Component
const DateRangePicker = React.forwardRef(({ dateRange, setDateRange, isVisible, toggleVisibility }, ref) => (
  <div ref={ref} className="relative w-full lg:w-auto lg:mb-0">
    <div className="flex">
      <FontAwesomeIcon
        icon={faCalendar}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]"
        onClick={() => toggleVisibility((prev) => !prev)}
      />
      <input
        type="text"
        value={dateRange[0].startDate ? formatDate(dateRange[0].startDate) : ''}
        onClick={() => toggleVisibility((prev) => !prev)}
        readOnly
        placeholder="Check-in"
        className="w-1/2 pl-7 pr-3 py-2 border-2 border-brand-secondary cursor-pointer text-black"
      />
      <input
        type="text"
        value={dateRange[0].endDate ? formatDate(dateRange[0].endDate) : ''}
        onClick={() => toggleVisibility((prev) => !prev)}
        readOnly
        placeholder="Check-out"
        className="w-1/2 pl-7 pr-3 py-2 border-2 border-brand-secondary cursor-pointer text-black"
      />
    </div>
    {isVisible && (
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
));

// Guests Input Component
const GuestInput = ({ value, onChange }) => (
  <div className="relative w-full lg:w-auto mb-0">
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="No. of guests"
      className="w-full pl-7 pr-3 py-2 border-2 border-brand-secondary text-black"
    />
    <FontAwesomeIcon icon={faPerson} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#074498]" />
  </div>
);

// Search Button Component
const SearchButton = ({ onSearch }) => (
  <button
    className="w-full md:w-auto sb__button--secondary bg-brand-secondary hover:bg-yellow-600 px-4 py-2 text-white"
    onClick={onSearch}
  >
    SEARCH
  </button>
);
