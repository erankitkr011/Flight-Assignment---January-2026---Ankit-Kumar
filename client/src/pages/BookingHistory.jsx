import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingHistory } from "../services/operations/bookingApi";
import Loader from "../components/common/Loader";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      const response = await getBookingHistory(token);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch booking history", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Booking History
      </h2>

      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-gray-800">
                  {booking.flightId.airline}
                </h3>
                <span className="text-sm text-gray-500">
                  PNR: {booking.pnr}
                </span>
              </div>

              <p className="text-gray-600">
                {booking.flightId.departureCity} →{" "}
                {booking.flightId.arrivalCity}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Booking Date:{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </p>

              <p className="text-lg font-bold text-green-600 mt-2">
                ₹{booking.finalPrice}
              </p>

              <button
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                Download Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
