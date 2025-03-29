import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! Redirecting to login...");
    navigate("/login");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-3xl font-semibold">Sign Up</h2>
        <p className="mt-2 text-gray-600">
          Already a member?{" "}
          <span 
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b-2 p-2 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-b-2 p-2 focus:outline-none"
            required
          />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Sign Up
          </button>
        
        </form>
        

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500">or sign up with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Sign Up */}
        <div className="flex justify-center space-x-4">
          <button className="p-2 bg-blue-700 text-white rounded-full">
            <FaFacebook size={24} />
          </button>
          <button 
            onClick={loginWithGoogle} 
            className="p-2 bg-red-600 text-white rounded-full"
          >
            <FaGoogle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
