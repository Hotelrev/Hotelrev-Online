import GlobalSearchBox from 'components/global-search-box/GlobalSearchbox';

// Import Destination Choices Images
import mumbai from "../../../../assets/destinationChoice/mumbai.png"
import bangkok from "../../../../assets/destinationChoice/bangkok.png"
import london from "../../../../assets/destinationChoice/london.png"
import dubai from "../../../../assets/destinationChoice/dubai.png"
import oslo from "../../../../assets/destinationChoice/oslo.png"
import paris from "../../../../assets/destinationChoice/paris.png"


const HeroCover = (props) => {
  const {
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    dateRange,
    onDateChangeHandler,
    onDatePickerIconClick,
    onSearchButtonAction,
    locationTypeheadResults,
    setisDatePickerVisible,
  } = props;

  const destinations = [
    { id: 1, name: 'Mumbai', imageUrl: mumbai },
    { id: 2, name: 'Bangkok', imageUrl: bangkok  },
    { id: 3, name: 'London', imageUrl: london  },
    { id: 4, name: 'Dubai', imageUrl: dubai  },
    { id: 5, name: 'Oslo', imageUrl: oslo  },
    { id: 6, name: 'Paris', imageUrl: paris  },
  ];

  return (
    <div
      className="bg-brand min-h-[100px] md:min-h-72 lg:min-h-60 text-slate-100 relative">
      <div className="hero-content__container flex flex-col items-center container mx-auto px-2 md:px-0">
        <></>
        <div className="hero-content__text py-4">
          <h3 className="text-4xl font-medium">
            Discover your perfect stay today
          </h3>
          <p className="my-1">
            Choose from our 2,500,000 hotels world wide. Enter your dates to see the latest prices and book a stay!
          </p>
        </div>
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={locationTypeheadResults}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          setisDatePickerVisible={setisDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          dateRange={dateRange}
          onDateChangeHandler={onDateChangeHandler}
          onDatePickerIconClick={onDatePickerIconClick}
          onSearchButtonAction={onSearchButtonAction}
        />
      </div>

      <div className="flex flex-row gap-9 items-center text-white p-6 pb-10 mx-auto mt-12 max-w-[90vw]">
  <div className='max-w-xl'>
    <h2 className="text-[#CBAE37] text-lg mb-4 font-normal">DESTINATION CHOICE</h2>
    <h3 className="text-3xl font-medium mb-3">Book Hotels at Popular Destinations</h3>
    <p className="text-base mb-6 font-thin">
      Explore our curated selection of hotels across three continents. Whether you&apos;re seeking
      the cultural richness of Europe, the untamed beauty of Africa, or the modern luxury of the
      UAE, we&apos;ve negotiated the best rates for your perfect stay.
    </p>
  </div>

  {/* Image Gallery */}
  <div className="grid grid-cols-3 gap-2">
    {destinations.map((destination) => (
      <div key={destination.id} className="relative group">
        <img src={destination.imageUrl} alt={destination.name} className="rounded-sm w-60 h-full object-cove transform group-hover:scale-110 transition-transform duration-300 ease-in-out" />
        <span className="absolute top-1 left-1 text-white text-lg font-medium px-2 py-1 rounded transform group-hover:scale-125 transition-transform duration-300 ease-in-out">
          {destination.name}
        </span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default HeroCover;
