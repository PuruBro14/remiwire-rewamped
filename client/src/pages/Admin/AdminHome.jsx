import React, { useEffect, useState } from "react";
import Sidebar from "./Layout/SideBar";
import MenuBarMobile from "./Layout/MenuBarMobile";
import LoginPage from "../AdminLoginPage";
import { Outlet } from "react-router-dom";

function AdminHome() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScreen, setShowScreen] = useState(0);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedIsLoggedIn === "true");
  }, []); 

  if (!isLoggedIn) {
    return <LoginPage setLoggedIn={setIsLoggedIn}/>;
  }
  
  return (
    <div className="min-h-screen">
      <div className="flex">
        <MenuBarMobile setter={setShowSidebar} setShowScreen={setShowScreen} />
        <Sidebar
          show={showSidebar}
          setter={setShowSidebar}
          setShowScreen={setShowScreen}
        />
         <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
