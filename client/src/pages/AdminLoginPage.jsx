import React, { useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = ({ setLoggedIn, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1cnV3djAyQGdtYWlsLmNvbSIsImlkIjoiNjYzNDlhZjgyOTNmYTQ5OTA0ODcwMmNiIiwiaWF0IjoxNzE4Mjk3MTg0LCJleHAiOjE3MTg1NTYzODR9.yubXT3Sa71rib9BV4TTKK6mhsGVbDtpFQ8cd7lqfyTA"
    if (username === "admin" && password === "Admin@123") {
      localStorage.setItem("token",JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1cnV3djAyQGdtYWlsLmNvbSIsImlkIjoiNjYzNDlhZjgyOTNmYTQ5OTA0ODcwMmNiIiwiaWF0IjoxNzE4Mjk3MTg0LCJleHAiOjE3MTg1NTYzODR9.yubXT3Sa71rib9BV4TTKK6mhsGVbDtpFQ8cd7lqfyTA"))
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "admin");
      setLoggedIn(true);
      setRole("admin");
      toast.success("Login successful!");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
