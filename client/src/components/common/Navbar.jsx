import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const walletBalance = useSelector((state) => state.wallet.balance);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWallet()); // ✅ REQUIRED
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">
        <Link to="/">Flight Booking</Link>
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center text-gray-700 font-medium">
        <Link to="/">Flights</Link>

        {token && (
          <>
            <Link to="/wallet">Wallet</Link>
            <Link to="/history">Bookings</Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-semibold text-green-700">
              ₹{walletBalance}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
