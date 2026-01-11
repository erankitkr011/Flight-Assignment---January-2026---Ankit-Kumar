const User = require('../models/User');

// Get logged-in user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete account
const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getProfile, updateProfile, deleteAccount };
