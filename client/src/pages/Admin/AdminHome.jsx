import React, { useEffect, useState } from "react";
import Sidebar from "./Layout/SideBar";
import MenuBarMobile from "./Layout/MenuBarMobile";
import ManageOrder from "./ManageOrder";
import ManageUsers from "./ManageUsers";
import {toast} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import { apiConnector } from '../../services/operations/apiconnector';
import AdminDashboard from "./AdminDashboard";
import UpdateProfile from "./UpdateProfile";
import ContactUs from "./ContactUs";
import LoginPage from "../AdminLoginPage";

function AdminHome() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScreen, setShowScreen] = useState(0);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedIsLoggedIn === "true");
  }, []); 

  const showMainDiv = () => {
    switch (showScreen) {
      case 0:
        return <AdminDashboard/>
      case 1:
        return (
          <>
            <ManageOrder />
          </>
        );
      case 2:
        return (
          <>
            <ManageUsers />
          </>
        );
      default:
        return null; 
    }
  };

  useEffect(() => {
    showMainDiv();
  }, [showScreen]);

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
          {showMainDiv()}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
