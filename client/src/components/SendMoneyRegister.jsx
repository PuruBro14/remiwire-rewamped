import React from 'react';
import Tab from './common/Tab';

const SendMoneyRegister = () => {
  return (
    <div className="py-6 px-6 lg:px-8 text-left">
      <h3 className="mb-4 text-xl font-medium text-gray-900 pt-5">
        Sign up to Remiwire
      </h3>
      <form className="space-y-6" action="#">
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your username"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
             Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your first name"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900">
            Mobile No
          </label>
          <input
            type="number"
            name="phoneNo"
            id="phoneNo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your mobile number"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="abc@company.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="........"
            required
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                name="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
              I accept the Terms & Conditions
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register your account
        </button>
        <div className="text-center leading-[1.2] font-medium text-gray-500">
          Already have account?
          <a href="#" className="text-blue-700 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SendMoneyRegister;
