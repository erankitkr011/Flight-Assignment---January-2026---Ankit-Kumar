const Booking = require('../models/Booking');
const { minutesAgo } = require('../utils/timeUtils');

exports.applySurgePricing = async (flight, userId) => {
  let finalPrice = flight.basePrice;

  const recentUserBookings = await Booking.find({
    flightId: flight._id,
    userId: userId,
    createdAt: { $gte: minutesAgo(5) },
  });

  // Apply surge only for same user
  if (recentUserBookings.length >= 3) {
    finalPrice = Math.round(finalPrice * 1.1);
  }

  return finalPrice;
};
