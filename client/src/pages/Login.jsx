import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/operations/authApi";
import { setToken } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      dispatch(setToken(response.token));
      navigate("/");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
