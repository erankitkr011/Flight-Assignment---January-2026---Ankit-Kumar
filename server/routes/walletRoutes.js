const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const {
    getWalletBalance
} = require('../controllers/WalletController');

router.get('/', authMiddleware, getWalletBalance);

module.exports = router;
