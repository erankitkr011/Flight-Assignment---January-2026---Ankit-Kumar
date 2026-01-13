// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../../slices/authSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { token } = useSelector((state) => state.auth);
//   const walletBalance = useSelector((state) => state.wallet.balance);

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(clearWallet()); // ✅ REQUIRED
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       {/* Logo */}
//       <h1 className="text-xl font-bold text-blue-600">
//         <Link to="/">Flight Booking</Link>
//       </h1>

//       {/* Links */}
//       <div className="flex gap-6 items-center text-gray-700 font-medium">
//         <Link to="/">Flights</Link>

//         {token && (
//           <>
//             <Link to="/wallet">Wallet</Link>
//             <Link to="/history">Bookings</Link>
//           </>
//         )}
//       </div>

//       {/* Right Side */}
//       <div className="flex gap-4 items-center">
//         {!token ? (
//           <>
//             <Link
//               to="/login"
//               className="text-blue-600 font-medium hover:underline"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-blue-600 text-white px-4 py-1 rounded"
//             >
//               Register
//             </Link>
//           </>
//         ) : (
//           <>
//             <span className="font-semibold text-green-700">
//               ₹{walletBalance}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { clearWallet } from "../../slices/walletSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const walletBalance = useSelector((state) => state.wallet.balance);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWallet());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-blue-600">
            Fly<span className="text-orange-500">Now</span>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Flights</Link>

            {token && (
              <>
                <Link to="/wallet" className="hover:text-blue-600">Wallet</Link>
                <Link to="/history" className="hover:text-blue-600">Bookings</Link>
              </>
            )}
          </div>

          {/* Right Section */}
          {!token ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold border">
                ₹ {walletBalance}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE NAV BELOW ================= */}
      {token && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="flex justify-around py-3 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600">✈️ Flights</Link>
            <Link to="/wallet" className="hover:text-blue-600">💰 Wallet</Link>
            <Link to="/history" className="hover:text-blue-600">📖 Bookings</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;