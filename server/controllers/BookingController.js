const path = require('path');
const fs = require('fs');

const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const Wallet = require("../models/Wallet");

const generatePNR = require("../utils/generatePNR");
const { applySurgePricing } = require("../services/pricingService");
const { generateTicketPDF } = require("../services/pdfService");

// BOOK FLIGHT
exports.bookFlight = async (req, res) => {
  try {
    const { flightId, passengerName } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const userId = req.user.id;

    if (!flightId || !passengerName) {
      return res.status(400).json({
        success: false,
        message: "Flight ID and passenger name are required",
      });
    }

    // Get flight
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    // Apply surge pricing
    const finalPrice = await applySurgePricing(flight, userId);

    // Get wallet
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet || wallet.balance < finalPrice) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance",
      });
    }

    // Deduct wallet balance
    wallet.balance -= finalPrice;
    await wallet.save();

    // Generate PNR
    const pnr = generatePNR();

    // Create booking
    const booking = await Booking.create({
      userId,
      flightId,
      passengerName,
      finalPrice,
      pnr,
    });

    // Generate PDF ticket
    await generateTicketPDF({
      passengerName,
      flight,
      finalPrice,
      pnr,
      bookingDate: booking.createdAt,
    });

    res.status(201).json({
      success: true,
      message: "Flight booked successfully",
      data: booking,
      pnr: booking.pnr,
      updatedBalance: wallet.balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// BOOKING HISTORY
exports.getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate("flightId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DOWNLOAD TICKET PDF
exports.downloadTicket = async (req, res) => {
  try {
    const { pnr } = req.params;

    const filePath = path.join(
      __dirname,
      '../tickets',
      `${pnr}.pdf`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.download(filePath, `${pnr}.pdf`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
