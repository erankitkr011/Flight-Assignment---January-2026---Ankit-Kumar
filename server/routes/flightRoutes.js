const express = require("express");
const router = express.Router();

const {
  getAllFlights,
  searchFlights,
} = require("../controllers/FlightController");

// Get 10 flights (default search)
router.get("/", getAllFlights);

// Search flights by cities
router.get("/search", searchFlights);

module.exports = router;
