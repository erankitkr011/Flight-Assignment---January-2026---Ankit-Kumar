// import { useState } from "react";
// import { registerUser } from "../services/operations/authApi";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       alert("Registration successful");
//       navigate("/login");
//     } catch (error) {
//       alert(error.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Register</h2>

//       <form onSubmit={handleRegister} className="space-y-4">
//         <input
//           name="firstName"
//           placeholder="First Name"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="lastName"
//           placeholder="Last Name"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <button className="w-full bg-green-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { registerUser } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-1">
            Register to start booking flights
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              placeholder="Enter first name"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              placeholder="Enter last name"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;