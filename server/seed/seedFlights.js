const mongoose = require('mongoose');
const Flight = require('../models/Flight');
require('dotenv').config();

const flights = [
  {
    flightId: 'AI101',
    airline: 'Air India',
    departureCity: 'Delhi',
    arrivalCity: 'Mumbai',
    basePrice: 2500,
  },
  {
    flightId: 'IN202',
    airline: 'IndiGo',
    departureCity: 'Mumbai',
    arrivalCity: 'Bangalore',
    basePrice: 2300,
  },
  {
    flightId: 'VT303',
    airline: 'Vistara',
    departureCity: 'Delhi',
    arrivalCity: 'Chennai',
    basePrice: 2800,
  },
  {
    flightId: 'SG404',
    airline: 'SpiceJet',
    departureCity: 'Kolkata',
    arrivalCity: 'Delhi',
    basePrice: 2100,
  },
  {
    flightId: 'AI505',
    airline: 'Air India',
    departureCity: 'Bangalore',
    arrivalCity: 'Pune',
    basePrice: 2400,
  },
  {
    flightId: 'IN606',
    airline: 'IndiGo',
    departureCity: 'Hyderabad',
    arrivalCity: 'Delhi',
    basePrice: 2600,
  },
  {
    flightId: 'VT707',
    airline: 'Vistara',
    departureCity: 'Mumbai',
    arrivalCity: 'Jaipur',
    basePrice: 2200,
  },
  {
    flightId: 'SG808',
    airline: 'SpiceJet',
    departureCity: 'Chennai',
    arrivalCity: 'Bangalore',
    basePrice: 2000,
  },
  {
    flightId: 'AI909',
    airline: 'Air India',
    departureCity: 'Pune',
    arrivalCity: 'Delhi',
    basePrice: 2700,
  },
  {
    flightId: 'IN010',
    airline: 'IndiGo',
    departureCity: 'Ahmedabad',
    arrivalCity: 'Mumbai',
    basePrice: 2250,
  },
];

const seedFlights = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Flight.deleteMany();
    await Flight.insertMany(flights);

    console.log('Flights seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedFlights();
