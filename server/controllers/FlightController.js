const Flight = require('../models/Flight');

// Get 10 flights (default)
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().limit(10);

    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search flights by departure & arrival city
exports.searchFlights = async (req, res) => {
  try {
    const { departureCity, arrivalCity } = req.query;

    const query = {};
    if (departureCity) query.departureCity = departureCity;
    if (arrivalCity) query.arrivalCity = arrivalCity;

    const flights = await Flight.find(query).limit(10);

    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
