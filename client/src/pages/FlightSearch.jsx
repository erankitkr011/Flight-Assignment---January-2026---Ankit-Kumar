// import { useEffect, useState } from "react";
// import { getAllFlights, searchFlights } from "../services/operations/flightApi";
// import FlightCard from "../components/core/FlightCard";
// import Loader from "../components/common/Loader";

// const FlightSearch = () => {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [departureCity, setDepartureCity] = useState("");
//   const [arrivalCity, setArrivalCity] = useState("");

//   // Fetch all flights on page load
//   useEffect(() => {
//     fetchFlights();
//   }, []);

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllFlights();
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error fetching flights", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       const response = await searchFlights(departureCity, arrivalCity);
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error searching flights", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Search Flights</h2>

//       {/* Search Filters */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Departure City"
//           value={departureCity}
//           onChange={(e) => setDepartureCity(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Arrival City"
//           value={arrivalCity}
//           onChange={(e) => setArrivalCity(e.target.value)}
//           style={{ marginLeft: "10px" }}
//         />

//         <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
//           Search
//         </button>
//       </div>

//       {/* Flight List */}
//       {loading ? (
//         <Loader />
//       ) : flights.length === 0 ? (
//         <p>No flights found</p>
//       ) : (
//         flights.map((flight) => (
//           <FlightCard key={flight._id} flight={flight} />
//         ))
//       )}
//     </div>
//   );
// };

// export default FlightSearch;


import { useEffect, useState } from "react";
import { getAllFlights, searchFlights } from "../services/operations/flightApi";
import FlightCard from "../components/core/FlightCard";
import Loader from "../components/common/Loader";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");

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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Search Flights
        </h1>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                From
              </label>
              <input
                type="text"
                placeholder="Departure City"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                To
              </label>
              <input
                type="text"
                placeholder="Arrival City"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white cursor-pointer py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Search Flights
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader />
          </div>
        ) : flights.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No flights found ✈️
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {flights.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;