import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from 'services/axiosApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(Cookies.get('accessToken'));

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          // Decode the token to get user information
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.sub;

          const response = await api.get(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response && response.data) {
            setUserDetails(response.data);
          } else {
            setUserDetails(null);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    };

    fetchUserProfile();
  }, [token]); // Run whenever the token changes

  return (
    <AuthContext.Provider value={{ token, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
