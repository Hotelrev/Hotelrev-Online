import SmileIcon from '../../../../assets/icons/smilingIcon.png';

const AboutUs = () => {
  return (
    <div className="px-6 sm:px-12 md:px-20 py-8 md:py-12 flex flex-col md:flex-row bg-[#F8FAFC] space-y-6 md:space-y-0 md:space-x-6">
      <div className="h-auto md:h-56 p-6 max-w-full md:max-w-2xl">
        <h2 className="text-brand text-base md:text-lg font-semibold mb-3 lg:mb-6">ABOUT US</h2>
        <h3 className="text-xl lg:text-2xl font-medium mb-2 lg:mb-4">We Live to Satisfy You</h3>
        <p className="text-gray-600 text-sm md:text-base">
          At HotelRev, we bridge the gap between travelers and exceptional accommodations across Africa, Europe, and the UAE.
          We&apos;re dedicated to making quality stays accessible to everyone.
        </p>
      </div>
      <div className="bg-brand text-white rounded-lg flex flex-col h-auto md:h-56 p-6">
        <img src={SmileIcon} alt="Smiling Icon" className="mb-2 lg:mt-1 lg:mb-4 w-6 md:w-5" />
        <h4 className="text-xl lg:text-2xl font-medium mb-1 lg:mb-4">Alpha Cruise Partnership</h4>
        <p className="text-sm md:text-base">
          Through our strategic partnership with Alpha Cruise, we offer exclusive access to premium cruise packages and unique destinations at preferential rates.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
