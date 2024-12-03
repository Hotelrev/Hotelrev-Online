import HeroCover from './components/hero-cover/HeroCover';
// import PopularLocations from './components/popular-locations/popular-locations';
// import { networkAdapter } from 'services/NetworkAdapter';
// import { useState, useEffect } from 'react';
// import { MAX_GUESTS_INPUT_VALUE } from 'utils/constants';
// import ResultsContainer from 'components/results-container/ResultsContainer';
// import { formatDate } from 'utils/date-helpers';
// import { useNavigate } from 'react-router-dom';
import HotelList from './components/HotelList';
import OfferList from './components/list-of-offers/OffersList'
import AboutUs from './components/aboutUs/AboutUs';
import LimitedOffers from './components/list-of-offers/LimitedOffers';

/**
 * Home component that renders the main page of the application.
 * It includes a navigation bar, hero cover, popular locations, results container, and footer.
 */
const Home = () => {
  // const navigate = useNavigate();

  // // State variables
  // const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  // const [locationInputValue, setLocationInputValue] = useState('pune');
  // const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  // const [popularDestinationsData, setPopularDestinationsData] = useState({
  //   isLoading: true,
  //   data: [],
  //   errors: [],
  // });
  // const [hotelsResults, setHotelsResults] = useState({
  //   isLoading: true,
  //   data: [],
  //   errors: [],
  // });

  // // State for storing available cities
  // const [availableCities, setAvailableCities] = useState([]);

  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: null,
  //     endDate: null,
  //     key: 'selection',
  //   },
  // ]);

  // useEffect(() => {
  //   /**
  //    * Fetches initial data for the Home route.
  //    * @returns {Promise<void>} A promise that resolves when the data is fetched.
  //    */
  //   const getInitialData = async () => {
  //     const popularDestinationsResponse = await networkAdapter.get(
  //       '/api/popularDestinations'
  //     );
  //     const hotelsResultsResponse =
  //       await networkAdapter.get('/api/nearbyHotels');

  //     const availableCitiesResponse = await networkAdapter.get(
  //       '/api/availableCities'
  //     );
  //     if (availableCitiesResponse) {
  //       setAvailableCities(availableCitiesResponse.data.elements);
  //     }

  //     if (popularDestinationsResponse) {
  //       setPopularDestinationsData({
  //         isLoading: false,
  //         data: popularDestinationsResponse.data.elements,
  //         errors: popularDestinationsResponse.errors,
  //       });
  //     }
  //     if (hotelsResultsResponse) {
  //       setHotelsResults({
  //         isLoading: false,
  //         data: hotelsResultsResponse.data.elements,
  //         errors: hotelsResultsResponse.errors,
  //       });
  //     }
  //   };
  //   getInitialData();
  // }, []);

  return (
    <>
      <HeroCover
        // locationInputValue={locationInputValue}
        // numGuestsInputValue={numGuestsInputValue}
        // locationTypeheadResults={availableCities}
        // isDatePickerVisible={isDatePickerVisible}
        // setisDatePickerVisible={setisDatePickerVisible}
        // onLocationChangeInput={onLocationChangeInput}
        // onNumGuestsInputChange={onNumGuestsInputChange}
        // dateRange={dateRange}
        // onDateChangeHandler={onDateChangeHandler}
        // onDatePickerIconClick={onDatePickerIconClick}
        // onSearchButtonAction={onSearchButtonAction}
      />

      <HotelList />
      <OfferList />
      <AboutUs />
      <LimitedOffers />
      {/* <div className="container mx-auto">
        <PopularLocations popularDestinationsData={popularDestinationsData} />
        <div className="my-8">
          <h2 className="text-3xl font-medium text-slate-700 text-center my-2">
            Handpicked nearby hotels for you
          </h2>
          <ResultsContainer
            hotelsResults={hotelsResults}
            enableFilters={false}
          />
        </div>
      </div> */}
    </>
  );
};

export default Home;
