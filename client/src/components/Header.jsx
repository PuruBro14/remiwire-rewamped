import React from 'react';
import Navbar from './Navbar/Navbar';
import "./Navbar/assets/css/Navbar.css";
import NavbarLogo from "../assets/images/logo.png";

const Header = ({}) => {
  return (
    <header className='bg-white shadow-xl sticky top-0 z-50'>
      <div className='w-11/12 mx-auto flex flex-row md:items-center '>
        <img
          className="w-[110px] h-[45px] my-4 md:mt-4"
          src={NavbarLogo}
          alt="Logo"
        />
        <Navbar/>
      </div>
    </header>
  );
};

export default Header;
