import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import api from 'services/axiosApi';
import Tabs from 'components/ux/tabs/Tabs';
import TabPanel from 'components/ux/tab-panel/TabPanel';
import PaymentMethodsPanel from './components/PaymentsMethodsPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faAddressCard,
  // faHotel,
  // faCreditCard,
  faAddressCard,
  // faHotel,
  faCreditCard,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
// import axios from 'axios';
// import { networkAdapter } from 'services/NetworkAdapter';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * UserProfile
 * Renders the user profile page with tabs for personal details, bookings, and payment methods.
 * @returns {JSX.Element} - The UserProfile component
 * */
const UserProfile = () => {
  // const { userDetails } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isTabsVisible, setIsTabsVisible] = useState(false);
  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // const [nationality, setNationality] = useState('');
  // const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const wrapperRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  // Fetch user bookings data
  // const [userBookingsData, setUserBookingsData] = useState({
  //   isLoading: true,
  //   data: [],
  //   errors: [],
  // });

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  // effect to set initial state of user details
  // useEffect(() => {
  //   if (userDetails) {
  //     setFullName(userDetails.fullName || '');
  //     setEmail(userDetails.email || '');
  //     setPhoneNumber(userDetails.phone || '');
  //     setNationality(userDetails.country || '');
  //     setIsEmailVerified(userDetails.isEmailVerified || '');
  //     setIsPhoneVerified(userDetails.isPhoneVerified || '');
  //   } else {
  //     navigate('/login');
  //   }
  // }, [navigate, userDetails]);

  // Decode token and fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(token)
        if (!token) {
          navigate('/login');
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.sub;

        const response = await api.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserDetails(response.data);
        setPaymentMethods(mockPaymentMethods); // Replace with actual payment data if available
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [token, navigate]);


  // effect to set initial state of user bookings data
  // useEffect(() => {
  //   const getInitialData = async () => {
  //     const userBookingsDataResponse = await networkAdapter.get(
  //       '/api/users/bookings'
  //     );
  //     if (userBookingsDataResponse && userBookingsDataResponse.data) {
  //       setUserBookingsData({
  //         isLoading: false,
  //         data: userBookingsDataResponse.data.elements,
  //         errors: userBookingsDataResponse.errors,
  //       });
  //     }
  //   };
  //   getInitialData();
  // }, []);

  // const handleEditClick = () => {
  //   setIsEditMode(!isEditMode);
  // };

  // const handleCancelClick = () => {
  //   setIsEditMode(!isEditMode);
  // };

  // const handleSaveClick = () => {
  //   // Perform save logic here
  //   setIsEditMode(false);
  // };

  // const onTabsMenuButtonAction = () => {
  //   setIsTabsVisible(!isTabsVisible);
  // };
  if (!userDetails) return <p>Loading...</p>;

  const handleEditClick = () => setIsEditMode(!isEditMode);
  const handleCancelClick = () => setIsEditMode(false);
  const handleSaveClick = () => {
    // Add save logic
    setIsEditMode(false);
  };
  const toggleTabsMenu = () => setIsTabsVisible(!isTabsVisible);

  return (
    <div className="container mx-auto p-4 my-10 min-h-[530px]">
      <div className="mx-4">
        <button
          ref={buttonRef}
          onClick={toggleTabsMenu}
          className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FontAwesomeIcon icon={isTabsVisible ? faXmark : faBars} size="lg" />
        </button>
      </div>
      <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
        <TabPanel label="Personal Details" icon={faAddressCard}>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Personal details
              </h3>
              <p className="mt-1 max-w-2xl text-gray-500">
                Keep your details current to ensure seamless communication and services.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {isEditMode ? (
                  <>
                    <TextField
                      label="First Name"
                      value={userDetails.firstName}
                      onChange={(value) =>
                        setUserDetails({ ...userDetails, firstName: value })
                      }
                    />
                    <TextField
                      label="Last Name"
                      value={userDetails.lastName}
                      onChange={(value) =>
                        setUserDetails({ ...userDetails, lastName: value })
                      }
                    />
                    <TextField
                      label="Email"
                      value={userDetails.email}
                      onChange={(value) =>
                        setUserDetails({ ...userDetails, email: value })
                      }
                    />
                    <TextField
                      label="Phone Number"
                      value={userDetails.phoneNumber}
                      onChange={(value) =>
                        setUserDetails({ ...userDetails, phoneNumber: value })
                      }
                    />
                    <TextField
                      label="Nationality"
                      value={userDetails.nationality}
                      onChange={(value) =>
                        setUserDetails({ ...userDetails, nationality: value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <DisplayField
                      label="Name"
                      value={`${userDetails.firstName} ${userDetails.lastName}`}
                    />
                    <DisplayField label="Email" value={userDetails.email} />
                    <DisplayField
                      label="Phone Number"
                      value={userDetails.phoneNumber || 'Not Provided'}
                    />
                    <DisplayField
                      label="Nationality"
                      value={userDetails.nationality || 'Not Provided'}
                    />
                  </>
                )}
              </dl>
            </div>
            <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancelClick}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel label="Payment Details" icon={faCreditCard}>
          <PaymentMethodsPanel
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

const DisplayField = ({ label, value }) => (
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const TextField = ({ label, value, onChange, type = 'text' }) => (
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 sm:mt-0 sm:col-span-2">
      <input
        type={type}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm md:text-base border-gray-300 rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </dd>
  </div>
);

const mockPaymentMethods = [
  {
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    expiryDate: '08/26',
  },
  {
    cardType: 'MasterCard',
    cardNumber: '**** **** **** 5678',
    expiryDate: '07/24',
  },
  {
    cardType: 'American Express',
    cardNumber: '**** **** **** 9012',
    expiryDate: '05/25',
  },
];

export default UserProfile;
