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
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{flight.airline}</h3>

      <p className="text-gray-600">
        {flight.departureCity} → {flight.arrivalCity}
      </p>

      <p className="text-lg font-bold text-green-600 mt-2">
        ₹{flight.basePrice}
      </p>

      <button
        onClick={handleBook}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default FlightCard;
