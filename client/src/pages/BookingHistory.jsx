// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getBookingHistory } from "../services/operations/bookingApi";
// import Loader from "../components/common/Loader";

// const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     fetchBookingHistory();
//   }, []);

//   const fetchBookingHistory = async () => {
//     try {
//       setLoading(true);
//       const response = await getBookingHistory(token);
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Failed to fetch booking history", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Booking History
//       </h2>

//       {loading ? (
//         <Loader />
//       ) : bookings.length === 0 ? (
//         <p className="text-gray-600">No bookings found</p>
//       ) : (
//         <div className="space-y-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="border rounded-xl p-4 bg-white shadow-sm"
//             >
//               <div className="flex justify-between mb-2">
//                 <h3 className="font-semibold text-gray-800">
//                   {booking.flightId.airline}
//                 </h3>
//                 <span className="text-sm text-gray-500">
//                   PNR: {booking.pnr}
//                 </span>
//               </div>

//               <p className="text-gray-600">
//                 {booking.flightId.departureCity} →{" "}
//                 {booking.flightId.arrivalCity}
//               </p>

//               <p className="text-sm text-gray-500 mt-1">
//                 Booking Date:{" "}
//                 {new Date(booking.createdAt).toLocaleString()}
//               </p>

//               <p className="text-lg font-bold text-green-600 mt-2">
//                 ₹{booking.finalPrice}
//               </p>

//               <button
//                 className="mt-3 text-sm text-blue-600 hover:underline"
//               >
//                 Download Ticket
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingHistory;


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingHistory } from "../services/operations/bookingApi";
import Loader from "../components/common/Loader";
import jsPDF from "jspdf";

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

  // ✈️ Airline-style PDF ticket (NO QR)
  const handleDownloadTicket = (booking) => {
    const doc = new jsPDF();

    /* ===== Outer Border ===== */
    doc.setLineWidth(0.8);
    doc.rect(10, 10, 190, 277);

    /* ===== Header ===== */
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204);
    doc.text("FlyNow Airlines", 20, 25);

    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text("E-Ticket / Boarding Pass", 20, 33);

    doc.setDrawColor(180);
    doc.line(10, 38, 200, 38);

    /* ===== Passenger & Flight Info ===== */
    doc.setFontSize(12);
    doc.setTextColor(0);

    doc.text("Passenger Name:", 20, 55);
    doc.text("Demo User", 70, 55);

    doc.text("PNR:", 20, 65);
    doc.text(booking.pnr, 70, 65);

    doc.text("Airline:", 20, 75);
    doc.text(booking.flightId.airline, 70, 75);

    doc.text("Route:", 20, 85);
    doc.text(
      `${booking.flightId.departureCity} → ${booking.flightId.arrivalCity}`,
      70,
      85
    );

    doc.text("Booking Date:", 20, 95);
    doc.text(
      new Date(booking.createdAt).toLocaleString(),
      70,
      95
    );

    /* ===== Price Box ===== */
    doc.setDrawColor(0, 150, 0);
    doc.rect(20, 110, 160, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 150, 0);
    doc.text(
      `Total Amount Paid: ₹${booking.finalPrice}`,
      30,
      124
    );

    /* ===== Footer ===== */
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Please carry a valid government ID along with this ticket.",
      20,
      150
    );

    doc.text(
      "Thank you for choosing FlyNow Airlines. Have a pleasant journey!",
      20,
      160
    );

    doc.save(`Ticket_${booking.pnr}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Booking History
        </h2>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No bookings found
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md border p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.flightId.airline}
                  </h3>
                  <span className="text-sm text-gray-500">
                    PNR: {booking.pnr}
                  </span>
                </div>

                <p className="text-gray-700 font-medium">
                  {booking.flightId.departureCity}
                  <span className="mx-2 text-gray-400">→</span>
                  {booking.flightId.arrivalCity}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Booking Date:{" "}
                  {new Date(booking.createdAt).toLocaleString()}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-green-600">
                    ₹{booking.finalPrice}
                  </p>

                  <button
                    onClick={() => handleDownloadTicket(booking)}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;