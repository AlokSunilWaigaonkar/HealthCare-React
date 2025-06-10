import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://13.48.10.193:8080", 
});

// Request Interceptor: Attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and refresh token logic
api.interceptors.response.use(
  (response) => response, // Pass all success responses
  async (error) => {
    const originalRequest = error.config;

    // Log for debugging
    console.log("❌ API error caught:", error.response?.status, originalRequest.url);

    // Check if token expired and refresh token is available
    const isTokenExpired = error.response?.status === 401;
    const hasRefreshToken = localStorage.getItem("refreshToken");

    if ((isTokenExpired || error.response?.status === 403 ) && !originalRequest._retry && hasRefreshToken) {
      originalRequest._retry = true;

      try {
        console.log("🔁 Refreshing access token...");

        const refreshRes = await axios.post(
          "http://13.48.10.193:8080/auth/refresh",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = refreshRes.data.accessToken;
        if (!newAccessToken) {
          throw new Error("Refresh token API didn't return a new accessToken.");
        }

        // Save new token & retry original request
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        console.log("✅ Access token refreshed, retrying original request.");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🚫 Refresh failed:", refreshError.response || refreshError);
        localStorage.clear(); // Clear both tokens
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;