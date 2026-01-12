import { apiConnector } from "../apiConnector";
import { flightEndpoints } from "../api";

const { GET_ALL_FLIGHTS, SEARCH_FLIGHTS } = flightEndpoints;

// Get 10 flights (default)
export const getAllFlights = async () => {
  return await apiConnector("GET", GET_ALL_FLIGHTS);
};

// Search flights by departure & arrival city
export const searchFlights = async (departureCity, arrivalCity) => {
  const queryParams = new URLSearchParams();

  if (departureCity) queryParams.append("departureCity", departureCity);
  if (arrivalCity) queryParams.append("arrivalCity", arrivalCity);

  return await apiConnector(
    "GET",
    `${SEARCH_FLIGHTS}?${queryParams.toString()}`
  );
};
