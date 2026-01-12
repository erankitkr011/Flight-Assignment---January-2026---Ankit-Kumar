import WalletBalance from "../components/core/WalletBalance";

const Wallet = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Wallet
      </h2>

      {/* Wallet Balance Card */}
      <WalletBalance />

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        <p>
          This wallet is used to book flight tickets.  
          The default balance is <strong>₹50,000</strong>.
        </p>
      </div>

    </div>
  );
};

export default Wallet;
