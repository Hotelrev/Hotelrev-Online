import SmileIcon from '../../../../assets/icons/smilingIcon.png'

const AboutUs = () => {
  return (
    <div className="px-20 py-12 flex flex-row bg-[#F8FAFC]">
      <div className="h-56 p-6 max-w-2xl">
      <h2 className="text-brand text-lg font-semibold mb-6">ABOUT US</h2>
      <h3 className="text-2xl font-medium mb-4">We Live to Satisfy You</h3>
      <p className="text-gray-600">
        At HotelRev, we bridge the gap between travelers and exceptional accommodations across Africa, Europe, and the UAE.
        We’re dedicated to making quality stays accessible to everyone.
      </p>
      </div>
      <div className="bg-brand text-white rounded-lg flex flex-col h-56 p-6">
      <img src={SmileIcon} alt="Smiling Icon" className="mt-1 mb-7 w-5" />
      <h4 className="text-2xl font-medium mb-4">Alpha Cruise Partnership</h4>
      <p>
        Through our strategic partnership with Alpha Cruise, we offer exclusive access to premium cruise packages and unique destinations at preferential rates.
      </p>
    </div>
    </div>
  );
};

export default AboutUs;
