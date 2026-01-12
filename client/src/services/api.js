const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS (optional)
export const authEndpoints = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};

// FLIGHT ENDPOINTS
export const flightEndpoints = {
  GET_ALL_FLIGHTS: `${BASE_URL}/flight`,
  SEARCH_FLIGHTS: `${BASE_URL}/flight/search`,
};

// BOOKING ENDPOINTS
export const bookingEndpoints = {
  BOOK_FLIGHT: `${BASE_URL}/booking`,
  BOOKING_HISTORY: `${BASE_URL}/booking/history`,
};

// WALLET ENDPOINTS
export const walletEndpoints = {
  GET_WALLET_BALANCE: `${BASE_URL}/wallet`,
};
