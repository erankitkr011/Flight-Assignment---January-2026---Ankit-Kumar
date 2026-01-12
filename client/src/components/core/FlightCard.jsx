// import { useSelector, useDispatch } from "react-redux";
// import { setWalletBalance } from "../../slices/walletSlice";
// import { bookFlight } from "../../services/operations/bookingApi";

// const FlightCard = ({ flight }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const handleBook = async () => {
//     try {
//       const res = await bookFlight(
//         {
//           flightId: flight._id,
//           passengerName: "Demo User",
//         },
//         token
//       );

//       dispatch(setWalletBalance(res.updatedBalance));

//       alert("Flight booked successfully");
//     } catch (error) {
//       alert(error.message || "Booking failed");
//     }
//   };

//   return (
//     <div className="border rounded-xl p-4 shadow-sm bg-white">
//       <h3 className="text-lg font-semibold">{flight.airline}</h3>

//       <p className="text-gray-600">
//         {flight.departureCity} → {flight.arrivalCity}
//       </p>

//       <p className="text-lg font-bold text-green-600 mt-2">
//         ₹{flight.basePrice}
//       </p>

//       <button
//         onClick={handleBook}
//         className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         Book Now
//       </button>
//     </div>
//   );
// };

// export default FlightCard;


import { useSelector, useDispatch } from "react-redux";
import { setWalletBalance } from "../../slices/walletSlice";
import { bookFlight } from "../../services/operations/bookingApi";

const FlightCard = ({ flight }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleBook = async () => {
    try {
      const res = await bookFlight(
        {
          flightId: flight._id,
          passengerName: "Demo User",
        },
        token
      );

      dispatch(setWalletBalance(res.updatedBalance));
      alert("Flight booked successfully");
    } catch (error) {
      alert(error.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition">

      {/* Airline */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {flight.airline}
        </h3>
        <span className="text-sm text-gray-500">
          Economy
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <p className="font-semibold text-gray-800">
            {flight.departureCity}
          </p>
        </div>

        <span className="text-gray-400 text-xl">→</span>

        <div className="text-right">
          <p className="text-sm text-gray-500">To</p>
          <p className="font-semibold text-gray-800">
            {flight.arrivalCity}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Price + Action */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-green-600">
          ₹{flight.basePrice}
        </p>

        <button
          onClick={handleBook}
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>

    </div>
  );
};

export default FlightCard;