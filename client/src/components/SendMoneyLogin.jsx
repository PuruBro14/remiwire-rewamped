import React, { useState } from 'react'
import Tab from './common/Tab'
import SignUp from './pages/Signup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../services/operations/authAPI';

const SendMoneyLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setLogin(email, password, navigate));

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900 pt-5">
            Sign in to Remiwire
          </h3>
          <form className="space-y-6" onSubmit={(e) => handleOnSubmit(e)}>
            <div>
              <label htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Email
              </label>
              <input type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleOnChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="abc@company.com"
              required
              />
            </div>

             <div>
              <label htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => handleOnChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="........"
              required
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                   <input
                id="remember"
                name="checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
              />
                </div>
                <label htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900">
                  Remember Me
                </label>
              </div>
              <Link to="#" className="text-sm text-blue-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center
            "
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
              Not registered?{""}
              <a>
              Create account
              </a>
            </div>
          </form>
        </div>
  )
}

export default SendMoneyLogin