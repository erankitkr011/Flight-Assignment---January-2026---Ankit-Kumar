const Wallet = require('../models/Wallet');

exports.getWalletBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing",
      });
    }

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 50000,
      });
    }

    res.status(200).json({
      success: true,
      balance: wallet.balance,
    });
  } catch (error) {
    // Handle duplicate edge-case safely
    if (error.code === 11000) {
      const wallet = await Wallet.findOne({ userId: req.user.id });
      return res.status(200).json({
        success: true,
        balance: wallet.balance,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
