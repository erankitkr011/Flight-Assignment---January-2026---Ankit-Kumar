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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="firstName"
          placeholder="First Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
