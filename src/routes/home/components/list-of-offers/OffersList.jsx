import offer1 from "../../../../assets/offersImage/offer1.png"
import offer2 from "../../../../assets/offersImage/offer2.png"
import offer3 from "../../../../assets/offersImage/offer3.png"
import offer4 from "../../../../assets/offersImage/offer4.png"

const features = [
  {
    title: 'Smart Discovery',
    description: 'Uncover hidden gems and exclusive properties through our intelligent booking system.',
    imageUrl: offer1,
  },
  {
    title: 'Real-Time Magic',
    description: 'Live rates, instant confirmations, and seamless integrations powered by RateHawk.',
    imageUrl: offer2,
  },
  {
    title: 'Beyond Booking',
    description: 'Complete travel ecosystem: itineraries, cruise packages, and corporate solutions.',
    imageUrl: offer3,
  },
  {
    title: 'Travel Confidently',
    description: '24/7 expert support and secure payments for peace of mind.',
    imageUrl: offer4,
  },
];

const OfferList = () => {
  return (
    <div className="py-12 px-28">
      <h2 className="text-brand text-lg font-semibold mb-4 text-center">WHAT WE OFFER</h2>
      <h3 className="text-2xl font-medium mb-12 text-center">Power Your Travel, All In One Place</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 px-6">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white rounded-lg shadow-lg p-4">
            <img src={feature.imageUrl} alt={feature.title} className="w-full h-36 object-cover mb-4" />
            <h4 className="text-[#475569] text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-[#6D6D6D] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferList;
