import alphaCruise from "../../../../assets/trustedByImages/alphaCruise.png";
import lagosContinental from "../../../../assets/trustedByImages/lagosContinental.png";
import rateHawk from "../../../../assets/trustedByImages/rateHawk.png";
import sheraton from "../../../../assets/trustedByImages/sheraton.png";
import zenHotels from "../../../../assets/trustedByImages/zenHotels.png";

const Carousel = () => {
  const images = [
    { src: alphaCruise, alt: "Alpha Cruise" },
    { src: lagosContinental, alt: "Lagos Continental" },
    { src: rateHawk, alt: "Rate Hawk" },
    { src: sheraton, alt: "Sheraton" },
    { src: zenHotels, alt: "Zen Hotels" },
  ];

  return (
    <div className="w-[100vw] pl-10 lg:pl-20 overflow-hidden text-white py-4">
      <div className="container mx-auto flex items-center">
        <div className="w-fit text-center text-lg font-bold whitespace-nowrap p-4">Trusted By</div>
        <div className="marquee min-w-max overflow-hidden relative">
            <div className="marquee-content gap-10 p-4">
              {images.concat(images).map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Inline CSS */}
      <style>
        {`
          .marquee {
            display: flex;
            position: relative;
          }
          .marquee-content {
            display: flex;
            animation: marquee 20s linear infinite;
          }
          @keyframes marquee {
             0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
