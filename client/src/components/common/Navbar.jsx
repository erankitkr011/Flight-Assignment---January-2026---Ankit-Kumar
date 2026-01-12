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
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-600">
            Fly<span className="text-orange-500">Now</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Flights
          </Link>

          {token && (
            <>
              <Link to="/wallet" className="hover:text-blue-600 transition">
                Wallet
              </Link>
              <Link to="/history" className="hover:text-blue-600 transition">
                Bookings
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Wallet Badge */}
              <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full font-semibold border border-green-200">
                ₹ {walletBalance}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;