const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const {
    getProfile,
    updateProfile,
    deleteAccount
} = require('../controllers/ProfileController');

// PROTECTED ROUTES
router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);
router.delete('/', authMiddleware, deleteAccount);

module.exports = router;
