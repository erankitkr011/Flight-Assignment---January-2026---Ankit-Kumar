import { useEffect, useState } from "react";
import { getAllFlights, searchFlights } from "../services/operations/flightApi";
import FlightCard from "../components/core/FlightCard";
import Loader from "../components/common/Loader";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");

  // Fetch all flights on page load
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await getAllFlights();
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await searchFlights(departureCity, arrivalCity);
      setFlights(response.data);
    } catch (error) {
      console.error("Error searching flights", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Flights</h2>

      {/* Search Filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Departure City"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Arrival City"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      {/* Flight List */}
      {loading ? (
        <Loader />
      ) : flights.length === 0 ? (
        <p>No flights found</p>
      ) : (
        flights.map((flight) => (
          <FlightCard key={flight._id} flight={flight} />
        ))
      )}
    </div>
  );
};

export default FlightSearch;
