import axios from "axios";

const api = axios.create({
  baseURL: "https://hotelrev-backend.onrender.com", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Get access token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the request
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle errors
);

// Add a response interceptor to handle 401 errors and refresh tokens
api.interceptors.response.use(
  (response) => response, // Return response directly if successful
  async (error) => {
    const originalRequest = error.config;

    // If the server responds with a 401 (unauthorized) and this is not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${api.baseURL}/refresh-token`, { refreshToken });

        const { accessToken } = response.data;

        // Save the new access token
        localStorage.setItem("accessToken", accessToken);

        // Update the original request with the new access token and retry it
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Handle token refresh failure (e.g., redirect to login)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/sign-in"; // Redirect to sign-in page
      }
    }

    return Promise.reject(error); // If it's another error, just reject it
  }
);

export default api;
