import aboutUs from '../../assets/logos/about-us.gif'
import { useState } from 'react';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Hotelrev?",
      answer: "Hotelrev is a premier online travel agency dedicated to revolutionizing the hotel booking experience across Africa."
    },
    {
      question: "How can I book a hotel through Hotelrev?",
      answer: "You can easily book a hotel through our user-friendly platform by searching for your destination, selecting your preferred hotel, and completing the booking process online."
    },
    {
      question: "What types of hotels are available on Hotelrev?",
      answer: "We offer a diverse selection of hotels across Africa, from luxury resorts to budget-friendly options, catering to all types of travelers."
    },
    {
      question: "Do you offer any discounts?",
      answer: "Yes, we provide exclusive discounts and deals that you won’t find anywhere else, helping you save on your travels."
    },
    {
      question: "How does Hotelrev support local hotels?",
      answer: "We promote hotels with limited social media presence, giving them the visibility they deserve and supporting local businesses and communities."
    },
    {
      question: "Can I plan my entire trip through Hotelrev?",
      answer: "Yes, through our strategic partnerships, we offer integrated trip planning and vacation scheduling services, providing you with a comprehensive travel solution."
    },
    {
      question: "What if I need help with my booking?",
      answer: "Our dedicated customer support team is always ready to assist you with any inquiries or issues, ensuring a smooth and enjoyable booking experience."
    }
  ];
  return (
    <>
      <div className="mt-10 lg:px-[50px] px-5 lg:flex lg:flex-row">
        <div className="lg:w-1/2 lg:pr-10">
          <h1 className="lg:text-3xl text-xl font-extrabold text-brand">About Us</h1>
          <p>
            At Hotelrev, we are dedicated to revolutionizing the hotel booking
            experience across Africa. As a premier online travel agency, our
            mission is to make the process of finding and booking accommodations
            seamless, efficient, and enjoyable for our customers. We understand
            the unique challenges faced by hotels with limited social media
            presence, as well as travelers not being able to make payments with
            their local debit cards, and we are committed to promoting these
            hidden gems to a broader audience and also making sure anyone can
            book hotels seamlessly from anywhere in the world.
            <br />
            Our platform is designed to cater to the needs of solo travelers,
            travel agents, and companies, offering a wide variety of quality
            hotels at unbeatable prices. With a user-friendly interface,
            extensive hotel listings, and exclusive discounts, Hotelrev ensures
            that every booking is a hassle-free and rewarding experience. Our
            commitment to excellence and customer satisfaction sets us apart
            in the competitive travel industry.
          </p>
        </div>
        <div className="lg:w-1/2 lg:pl-10 lg:flex lg:items-center">
          <img src={aboutUs} alt="About Us" className="w-full h-auto " />
        </div>
      </div>
      <br />
      <div className="mt-10 lg:px-[50px] px-5 ">
        <div className="">
          <h2 className="lg:text-3xl text-xl font-extrabold text-brand">Our Vision</h2>
          <p>
            Our vision at Hotelrev is to become the leading online travel agency
            in Africa, recognized for our exceptional service, innovative solutions,
            and unwavering commitment to customer satisfaction. We aspire to create
            a world where every traveler can effortlessly find and book the perfect
            accommodation, no matter their destination.
            <br />
            We envision a future where Hotelrev is synonymous with trust, quality,
            and convenience, continuously expanding our reach and enhancing our
            offerings to meet the evolving needs of our customers. Through
            strategic partnerships, cutting-edge technology, and a deep
            understanding of the African travel landscape, we aim to empower
            travelers and support the growth of the hospitality industry across
            the continent.
            <br />
            As we move forward, our focus remains on delivering unparalleled
            value, fostering lasting relationships with our partners, and
            making a positive impact on the communities we serve. At Hotelrev,
            we are driven by a passion for travel and a commitment to
            excellence, striving every day to turn our vision into reality.
          </p>
        </div>
      </div>
      <br />
      <div className="mt-10 lg:px-[50px] px-5 ">
        <div className="">
          <h2 className="lg:text-3xl text-xl font-extrabold text-brand">Why Choose Us?</h2>
          <p className='text-lg'>
            Choosing Hotelrev means partnering with a travel agency committed to providing the
            best hotel booking experience in Africa. Here's why:
          </p>
          <ul className="ml-7 list-disc">
            <li>
              <strong>Seamless Booking:</strong> Our user-friendly platform ensures quick and easy hotel bookings for all types of travelers.
            </li>
            <li>
              <strong>Extensive Listings:</strong> We offer a diverse selection of hotels across Africa, from luxury resorts to budget-friendly options.
            </li>
            <li>
              <strong>Exclusive Discounts:</strong> Enjoy unbeatable deals and discounts, helping you save on your travels without compromising quality.
            </li>
            <li>
              <strong>Support for Local Gems:</strong> We promote hotels with limited social media presence, giving visibility to hidden gems and supporting local businesses.
            </li>
            <li>
              <strong>Comprehensive Solutions:</strong> Our partnerships allow us to offer integrated trip planning and vacation scheduling, making us a one-stop solution for all your travel needs.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> Our dedicated support team ensures a smooth and enjoyable booking experience from start to finish.
            </li>
            <li>
              <strong>Advanced Technology:</strong> We use the latest technology for secure payments and real-time availability updates, providing reliable and efficient service.
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div className="mt-10 lg:px-[50px] px-5">
        <h2 className="lg:text-3xl text-xl font-extrabold text-brand">Contact Us</h2>
        <p>
          Have questions or need assistance? Feel free to reach out to our
          customer support team at{' '}
          <a className="text-brand" href="mailto:hotelrev@zoho.com">
            hotelrev@zoho.com
          </a>
          . We're here to help!
        </p>
        <p>
          Thank you for choosing Hotelrev. We look forward to being your
          go-to platform for all your hotel booking needs.
        </p>
        <br />
      </div>

      <div className="mt-10 lg:px-[50px] px-5">
        <h2 className="lg:text-3xl text-xl font-extrabold text-brand">FAQ</h2>
        <div className="space-y-5">
          {faqData?.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full text-left py-4 focus:outline-none flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
              >
                <p className="py-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
