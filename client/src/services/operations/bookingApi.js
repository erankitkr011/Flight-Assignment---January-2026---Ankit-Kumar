import { apiConnector } from "../apiConnector";
import { bookingEndpoints } from "../api";

const { BOOK_FLIGHT, BOOKING_HISTORY } = bookingEndpoints;

// Book a flight
export const bookFlight = async (data, token) => {
  return await apiConnector(
    "POST",
    bookingEndpoints.BOOK_FLIGHT,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Get booking history
export const getBookingHistory = async (token) => {
  return await apiConnector(
    "GET",
    BOOKING_HISTORY,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
