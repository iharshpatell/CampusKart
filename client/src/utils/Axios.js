import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Ensure cookies are sent (if backend uses them)
});

// 🔹 Add access token to request headers
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Correct key
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Handle expired tokens by refreshing them
Axios.interceptors.response.use(
    (response) => response,
    
    async (error) => {
        const originalRequest = error.config;

        // If the request is unauthorized & not already retried, attempt token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops

            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);
                
                if (newAccessToken) {
                    localStorage.setItem("token", newAccessToken); // Save new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest); // Retry request with new token
                }
            }
        }

        return Promise.reject(error);
    }
);

// 🔹 Function to refresh access token
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(
            SummaryApi.refreshToken.url, // Ensure correct URL
            {},
            {
                headers: { Authorization: `Bearer ${refreshToken}` },
                withCredentials: true, // Required for secure refresh tokens
            }
        );

        const newAccessToken = response.data.data.accessToken;
        if (newAccessToken) {
            localStorage.setItem("token", newAccessToken);
            return newAccessToken;
        }
    } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("token"); // Remove invalid tokens
        localStorage.removeItem("refreshToken");
        return null;
    }
};

export default Axios;
