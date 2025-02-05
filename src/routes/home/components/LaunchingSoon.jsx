import React, { useState } from 'react';
import comingsoon from '../../../assets/logos/comingsoon.gif';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const LaunchingSoon = () => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false)

  const handleNotifyMeClick = () => {
    // Simulate email submission
    if (email === '') {
      setShowMessage2(true)
      setTimeout(() => {
        setShowMessage2(false)
      }, 2000);
    } else {
      setShowMessage(true);
      setEmail('')
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col items-center justify-center min-h-screen bg-gray-100 lg:py-12 py-5">
      <img src={comingsoon} alt="Travel and Hotels" className="lg:w-[500px] w-[80%] lg:mr-[-120px]" />
      <div className="max-w-md w-full text-center bg-white shadow rounded-lg p-8 z-10 lg:mt-[1px] mt-[-125px]">
        <h1 className="text-4xl font-bold text-[#074498] mb-4">Launching Soon</h1>
        <p className="text-gray-700 mb-6">Stay tuned for the best hotel booking experience!</p>
        <div className="mb-6">
          {showMessage && <p className="text-green-500 mb-4">Email received! Thank you!</p>}
          {showMessage2 && <p className="text-red-500 mb-4">Please enter your email address!</p>}
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Enter your email to get notified"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-[#074498] text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handleNotifyMeClick}
          >
            Notify Me
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <a href="https://www.facebook.com/profile.php?id=61561195584204" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-blue-600 hover:text-blue-800" />
          </a>
          <a href="https://www.instagram.com/hotelrev.ng/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 hover:text-pink-700" />
          </a>
          <a href="https://x.com/Hotelrev_" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 hover:text-blue-600" />
          </a>
          <a href="mailto:hotelrev@zoho.com">
            <FaEnvelope className="text-gray-600 hover:text-gray-800" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaunchingSoon;
