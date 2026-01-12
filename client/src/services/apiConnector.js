import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API connector
export const apiConnector = async (method, url, bodyData, headers = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default axiosInstance;
