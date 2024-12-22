import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setAdminToken, setRole } from "../utils/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('handleLogin');
    
    try {
      const response = await axios.post('import.meta.env.VITE_BACKEND_URL/api/admin/login', { username, password });
      console.log('response--',response);
      
      const { token, role } = response.data;

      localStorage.setItem('adminToken', JSON.stringify(token));
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('role', role);
      toast.success('Login successful!');
      dispatch(setAdminToken(response?.data?.token))
      dispatch(setRole("admin"))
      navigate("/admin/dashboard")
      console.log('------->runned');
    } catch (error) {
      console.log('error',error);
      toast.error('Invalid username or password on client sideeeeee');
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
            value={username}ProtectedRoute
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
