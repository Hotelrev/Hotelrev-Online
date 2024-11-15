const HotelCard = ({ name, location, distance, price, imageUrl }) => {
  return (
    <div className="flex items-center border border-gray-200 p-4 rounded-lg mb-4">
      <img src={imageUrl} alt={name} className="w-48 object-cover mr-4" />
      <div className="flex-1 h-32 flex flex-col justify-between">
        <div>
        <h3 className="text-gray-600 text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm">{location} | {distance} from city center</p>
        </div>
        <div className="text-green-600 text-sm font-semibold">
          <p>✓ Free cancellation</p>
          <p>✓ No prepayment needed &hyphen; pay at the property</p>
        </div>
      </div>

      <hr className="border border-l-2 h-32 mr-5"/>
      <div className="flex flex-col items-center h-32 justify-between">
        <div className="bg-[#074498] text-white text-sm font-normal px-3 py-2">
          5 &#9733;
        </div>
        <span className="flex flex-col items-center">
        <p className="text-lg font-medium mt-1">&#8377; {price}</p>
        <button className="bg-brand-secondary hover:bg-yellow-600 text-white px-4 py-2 font-normal">
          Book now
        </button>
        </span>
      </div>
    </div>
  );
};

export default HotelCard;
