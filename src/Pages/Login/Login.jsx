import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      localStorage.setItem("role", "user");
      navigate("/browsebook");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      localStorage.setItem("user", JSON.stringify(userInfo.data));
      navigate("/browsebook");
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
        <button
          onClick={loginWithGoogle}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
