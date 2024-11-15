const HotelCard = ({ name, location, distance, price, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row items-center border border-gray-200 p-4 rounded-lg mb-4 max-w-[70vw] mx-auto">
      <img src={imageUrl} alt={name} className="w-[70vw] md:w-48 object-cover md:mr-4" />
      <div className="flex-1 h-32 flex flex-col justify-between w-full">
        <div>
        <h3 className="text-gray-600 text-xl font-semibold mt-7 md:mt-0">{name}</h3>
        <p className="text-gray-600 text-sm">{location} | {distance} from city center</p>
        </div>
        <div className="text-green-600 text-sm font-semibold">
          <p>✓ Free cancellation</p>
          <p>✓ No prepayment needed &hyphen; pay at the property</p>
        </div>
      </div>

      <hr className="md:border md:border-l-2 h-0 md:h-32 md:mr-5"/>
      <div className="w-full md:w-fit flex flex-col items-center h-32 justify-between">
        <div className="flex w-full md:w-fit justify-between mt-8 md:mt-0 items-center">
          <span className="bg-[#074498] text-white text-sm font-normal px-3 py-2">
          5 &#9733;
        </span>
        <p className="text-lg font-medium md:hidden">&#8377; {price}</p>
        </div>
        <span className="flex flex-col items-center w-full">
        <p className="text-lg font-medium mt-1 hidden md:block">&#8377; {price}</p>
        <button className="w-full bg-brand-secondary hover:bg-yellow-600 text-white px-4 py-2 font-normal">
          Book now
        </button>
        </span>
      </div>
    </div>
  );
};

export default HotelCard;
