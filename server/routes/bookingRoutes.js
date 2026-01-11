const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const {
    bookFlight,
    getBookingHistory,
    downloadTicket
} = require('../controllers/BookingController');

router.post('/', authMiddleware, bookFlight);
// router.post('/', bookFlight);
router.get('/history', authMiddleware, getBookingHistory);
router.get('/download/:pnr', downloadTicket);

module.exports = router;
