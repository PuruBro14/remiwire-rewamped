import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import NavbarLogo from "../../assets/images/logo.png"

const AdminNavbar = ({ username }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md h-20">
      <img
          className="w-[110px] h-[45px] my-4 md:mt-4"
          src={NavbarLogo}
          alt="Logo"
        />
      <div className="flex items-center space-x-4">
        <span>Hello {username}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => dispatch(logout(navigate))}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
