import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "./services/operations/walletApi";
import { setWalletBalance } from "./slices/walletSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import FlightSearch from "./pages/FlightSearch";
import Wallet from "./pages/Wallet";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    const fetchWallet = async () => {
      try {
        const res = await getWalletBalance(token);
        dispatch(setWalletBalance(res.balance));
      } catch (error) {
        console.error("Wallet fetch failed");
      }
    };

    fetchWallet();
  }, [token, dispatch]);
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
