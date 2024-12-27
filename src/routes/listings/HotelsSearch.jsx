import React, { useState, useEffect } from 'react';
import GlobalSearchBox from 'components/global-search-box/GlobalSearchbox';
import api from 'services/axiosApi';
import { useLocation } from 'react-router-dom';

const HotelsSearch = () => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  // const [pagination, setPagination] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchData = async (type, id, checkin, checkout, numGuests, language, page, limit) => {
    setIsLoading(true);
    setError(null);

    try {
      let endpoint = '';
      let requestBody = {
        id: id, // Assuming `id` is the hotel ID
        checkin: checkin,
        checkout: checkout,
        language: language,
        guests: [
          {
              adults: 2,
              children: [],
          }
        ],
      };
      console.log('Request Type:', type);
      console.log('Request Body:', requestBody);

      if (type === 'hotel') {
        endpoint = `/hotels/page`;
        requestBody = {
          ...requestBody
        };
      } else if (type === 'region') {
        endpoint = `/hotels/search`;
        requestBody = {
          ...requestBody,
          type: type,
          id: id, // Assuming `id` is the region ID
          page,
          limit: 10,
        };
      }

      console.log('Endpoint:', endpoint);
      const response = await api.post(endpoint, requestBody);
      const totalPages = response.data.pagination?.totalPages || 1;
      console.log('Type:', type);
      console.log('API Response:', response);


      if (type === 'hotel') {
        console.log('Hotel Data:', response.data); // Log the response for debugging
        setSelectedHotel(response.data || []);
      } else if (type === 'region') {
        console.log(response.data); // Log the response for debugging
        setHotelsData(response.data.data || []);
        setTotalPages(totalPages);
        setCurrentPage(page);
        // setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const { type, id, checkin, checkout, numGuests, language, limit } = location.state;
      fetchData(type, id, checkin, checkout, numGuests, language, newPage, limit);
    }
  };


  useEffect(() => {
    if (location.state) {
      console.log(location.state)
      const { type, id, checkin, checkout, numGuests, language, page, limit } = location.state;
      // fetchData(type, id, checkin, checkout, numGuests, language, page, limit);
      fetchData(type, id, checkin, checkout, Number(numGuests), language, page, limit);
      // fetchData('hotel', 'good_night_3', '2024-12-20', '2024-12-26', 2, 'en', 1, 10);
    }
  }, [location.state]);

  const renderRegionHotels = () => {
    if (!hotelsData.length) return <p>No hotels found in this region.</p>;

    return (
      <div className="hotels-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelsData.map((hotel) => (
          <div key={hotel.id} className="hotel-card border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Hotel Name: {hotel.hid}</h3>
            <p>Hotel ID: {hotel.id}</p>
            <h4 className="font-semibold mt-2">Rates:</h4>
            {hotel.rates.map((rate, idx) => (
              <div key={idx} className="rate-info pl-4 border-l mt-2">
                <p>Daily Prices: {rate.daily_prices?.join(', ') || 'N/A'}</p>
                <p>Meal: {rate.meal || 'N/A'}</p>
                <p>Amount: {rate.payment_options?.payment_types[0]?.amount || 'N/A'}</p>
                <p>
                  Free Cancellation Before:{' '}
                  {rate.payment_options?.payment_types[0]?.cancellation_penalties?.free_cancellation_before || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderHotelDetails = () => {
    if (!selectedHotel) return <p>No hotel details available.</p>;
    console.log(selectedHotel)

    const hotel = selectedHotel.hotels?.[0]; // Assuming response.data.hotels is an array with one hotel for 'hotel' type
    if (!hotel) return <p>No hotel data found.</p>;

    return (
      <div className="hotel-detail border p-4 rounded shadow">
        <h2 className="text-lg font-bold">Hotel Name: {hotel.hid}</h2>
        <p>Hotel ID: {hotel.id}</p>
        <h3 className="font-semibold mt-2">Rates:</h3>
        {hotel.rates.map((rate, idx) => (
          <div key={idx} className="rate-info pl-4 border-l mt-2">
            <p>Daily Prices: {rate.daily_prices?.join(', ') || 'N/A'}</p>
            <p>Meal: {rate.meal || 'N/A'}</p>
            <p>Amount: {rate.payment_options?.payment_types[0]?.amount || 'N/A'}</p>
            <p>
              Free Cancellation Before:{' '}
              {rate.payment_options?.payment_types[0]?.cancellation_penalties?.free_cancellation_before || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="hotels">
      <div className="bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={availableCities}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          setisDatePickerVisible={setisDatePickerVisible}
        />
      </div>

      <div className="my-4" />

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="results">
  {location.state?.type === 'hotel'
    ? renderHotelDetails()
    : renderRegionHotels()}
</div>

      {/* {!isLoading && !error && (
        <div className="results">
          {location.state?.type === 'hotel' ? (
            <div className="hotel-detail border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{selectedHotel.hid}</h2>
              <p>{selectedHotel.id}</p>
              <h3 className="font-semibold">Rates:</h3>
                {selectedHotel.rates.map((rate, idx) => (
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
          ) : (
            renderRegionHotels()
          )}
        </div>
      )} */}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-300 rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-300 rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelsSearch;
