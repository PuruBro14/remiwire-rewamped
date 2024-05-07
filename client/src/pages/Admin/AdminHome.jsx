import React, { useEffect, useState } from "react";
import Sidebar from "./Layout/SideBar";
import MenuBarMobile from "./Layout/MenuBarMobile";
import ManageOrder from "./ManageOrder";
import ManageUsers from "./ManageUsers";

function AdminHome() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScreen, setShowScreen] = useState(0);

  // Function to determine what to show in the main content based on `showScreen`
  const showMainDiv = () => {
    switch (showScreen) {
      case 0:
        return "Dashboard";
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
        return null; // Add default case or return null if no match
    }
  };

  useEffect(() => {
    showMainDiv();
  }, [showScreen]); // Add `showScreen` as a dependency for useEffect

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
