import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from 'services/axiosApi';
import Toast from 'components/ux/toast/Toast';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handles input changes for password fields
  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const dismissError = () => {
    setErrorMessage('');
  };


  // Handles the submission of the reset password form
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage('Invalid or missing token. Please try again.');
      return;
    }

    const { newPassword, confirmPassword } = passwordData;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      // Make API request to reset password
      const response = await api.post(`/password/reset/${token}`, { newPassword });

      if (response?.data?.success) {
        setSuccess(true); // Set success state
      } else {
        setErrorMessage(response?.data?.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Error during password reset:', error.response?.data || error.message);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
      {success ? (
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
              Your password has been reset successfully!
            </h3>
            <div className="py-10 text-center">
              <Link
                to="/login"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleResetSubmit}
          className="w-full max-w-lg p-4 md:p-10 shadow-md"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-brand my-4">
              Reset your password
            </h2>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            {errorMessage && (
              <Toast
                type="error"
                message={errorMessage}
                dismissError={dismissError}
              />
            )}
            <div className="flex-wrap items-center justify-between">
              <button
                type="submit"
                className="w-full bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Password
              </button>
              <div className="mt-5">
                <Link
                  to="/login"
                  className="inline-block align-baseline text-lg text-gray-500 hover:text-blue-800 text-right"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
