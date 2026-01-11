const Wallet = require('../models/Wallet');

// Get wallet balance
exports.getWalletBalance = async (req, res) => {
  try {
    const userId = req.user?.id;

    let wallet = await Wallet.findOne({ userId });

    // Create wallet if not exists
    if (!wallet) {
      wallet = await Wallet.create({ userId });
    }

    res.status(200).json({
      success: true,
      balance: wallet.balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
