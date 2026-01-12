import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "../../services/operations/walletApi";
import { setWalletBalance } from "../../slices/walletSlice";

const WalletBalance = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.wallet.balance);

  useEffect(() => {
    if (!token) return;

    const fetchBalance = async () => {
      try {
        const response = await getWalletBalance(token);
        dispatch(setWalletBalance(response.balance));
      } catch (error) {
        console.error("Failed to fetch wallet balance", error);
      }
    };

    fetchBalance();
  }, [token, dispatch]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between">
      <span className="font-medium text-gray-700">Wallet Balance</span>
      <span className="font-bold text-green-600">₹{balance}</span>
    </div>
  );
};

export default WalletBalance;
