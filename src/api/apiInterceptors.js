import axios from "axios";
import authConfig from "../configs/auth";
import { handleMockRequest } from "./mockData";
// import { isTokenExpired } from "src/@core/layouts/utils";
import { toast } from "react-toastify";
import {
  USER_ACCESS_TOKEN_KEY,
  USER_REFRESH_TOKEN_KEY,
} from "../../src/appConstants";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let isRefreshing = false;
let refreshQueue = [];
// const auth = useAuth()
// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(USER_ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    const refreshToken = window.localStorage.getItem(
      authConfig.onTokenExpiration
    );

    if (
      storedToken &&
      refreshToken
      // && isTokenExpired()
    ) {
      /* This code block is responsible for handling the refresh of the access token when it has
     expired. */
      if (!isRefreshing) {
        isRefreshing = true;
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          refreshQueue.forEach((cb) => cb(newAccessToken));
          refreshQueue = [];
        } else {
          localStorage.removeItem("userData");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          window.location.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
        }
        isRefreshing = false;
      } else {
        // If a refresh is already in progress, queue the request
        await new Promise((resolve) => {
          refreshQueue.push((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            resolve();
          });
        });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/* -------------------------- getting a new access token after expiry -------------------------- */
const refreshAccessToken = async () => {
  const refreshToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem(USER_REFRESH_TOKEN_KEY)
      : null;
  try {
    const response = await axios.post(
      authConfig.refreshTokenEndpoint,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (response) {
      // add new updated accessToken
      window.localStorage.setItem(
        USER_ACCESS_TOKEN_KEY,
        response.data.data.accessToken
      );
      window.localStorage.setItem(
        USER_REFRESH_TOKEN_KEY,
        response.data.data.refreshToken
      );
      return response.data.data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const api = async ({
  endpoint,
  method = "POST",
  payloadData = null,
  headers = {},
  showToast = true,
}) => {
  try {
    // USE_MOCK: To enforce mock for this demo
    const USE_MOCK = false;
    if (USE_MOCK) {
      const mockRes = await handleMockRequest({
        endpoint,
        method,
        payloadData,
      });
      if (mockRes) return mockRes;
    }

    const response = await axiosInstance({
      url: endpoint,
      method,
      data: payloadData,
      headers,
    });
    console.log(response, "response")
    if (showToast && response.data?.message) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (showToast) {
      toast.error(response?.data?.message || "An error occurred. Please try again.");
    }
    console.error("API ERROR:", error);
    throw error;
  }
};


