import hyattPune5 from "../../../../assets/locationsImage/hyattPune5.png"

const LimitedOffers = () => {
  const offers = [
    { title: 'Trip to Togo', description: 'Go on a stress-free group travel', image: hyattPune5, },
    { title: '3 days at Obudu', description: 'Go on a stress-free group travel', image: hyattPune5, },
    { title: 'Trip to Togo', description: 'Go on a stress-free group travel', image: hyattPune5, },
  ];

  return (
    <div className="px-20 py-10 bg-[#F8FAFC]">
      {/* Title and Subtitle */}
      <div className="mb-10">
        <h2 className="text-blue-900 text-lg font-semibold mb-5">OFFERS</h2>
        <h1 className="text-2xl font-medium mb-2">Take Advantage of Our Limited Offers</h1>
        <p className="text-gray-500 mt-2">Bringing promotions, deals, and special offers just for you by Alpha Cruise</p>
      </div>

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div key={index} className="flex justify-around bg-white border border-gray-200 p-3">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-40 object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
              <p className="text-gray-500 mt-2">{offer.description}</p>
              <button className="mt-4 w-full bg-brand-secondary hover:bg-yellow-600 text-white font-normal py-2">
              Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedOffers;
