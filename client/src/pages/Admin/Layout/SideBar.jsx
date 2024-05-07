import React from "react";
import { Link } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaTshirt, FaRedhat } from "react-icons/fa";

function Sidebar({ show, setter, setShowScreen }) {
  // Clickable menu items
  const MenuItem = ({ icon, name, route, onClick }) => {
    // Define the class for the menu item based on the current route
    const colorClass =
      window.location.pathname === route
        ? "text-white"
        : "text-white/50 hover:text-white";

    const handleClick = () => {
      onClick && onClick();
      setter(false);
    };

    return (
      <Link
        to={route}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
        onClick={handleClick}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  // Define our base class
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visibility
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter(false);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex">
          {/*eslint-disable-next-line*/}
          {/* <img src={logo.src} alt="Company Logo" width={300} height={300} /> */}
        </div>
        <div className="flex flex-col">
          <MenuItem
            name="Dashboard"
            route="/admin/dashboard"
            icon={<SlHome />}
            onClick={() => {
              setShowScreen(0);
            }}
          />
          <MenuItem
            name="Manage Orders"
            route="/admin/manage/orders"
            icon={<FaTshirt />}
            onClick={() => {
              setShowScreen(1);
            }}
          />
          <MenuItem
            name="Manage Users"
            route="/admin/manage/users"
            icon={<FaRedhat />}
            onClick={() => {
              setShowScreen(2);
            }}
          />
          <MenuItem
            name="Update Profile"
            route="/admin/manage/profile"
            icon={<BsInfoSquare />}
            onClick={() => {
              setShowScreen(3);
            }}
          />
          <MenuItem name="Contact" route="/contact" icon={<BsEnvelopeAt />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}

export default Sidebar;
