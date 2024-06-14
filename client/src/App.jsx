import Home from "./components/HomePage/Home";
import Login from "./components/Form/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrepaidTravelCard from "./components/OurServices/PrepaidTravelCard";

import NRIRepatriation from "./components/OurServices/NRIREPATRIATION/NRIRepatriation";
import BlockedAccountHome from "./components/OurServices/BlockedAccountPayment/BlockedAccountHome";
import OverseasEducationLoan from "./components/OurServices/OverseasEducationLoan";
import Signup from "./components/pages/Signup";
import Footer from "./components/Footer";
import OpenRoute from "./components/Auth/OpenRoute";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import TrackShipment from "./pages/TrackShipment";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import AddAdditionalDetails from "./components/core/AddAdditionalDetails";
import UpdatePassword from "./components/core/UpdatePassword";
import ManageDeliveryAddress from "./components/core/ManageDeliveryAddress";
import MyProfile from "./components/core/MyProfile";
import ManageProfileAddress from "./components/core/ManageProfileAddress";
import Error from "./components/Error";
import AdminHome from "./pages/Admin/AdminHome";
import MyOrders from "./pages/MyOrders";
import CreateGICAccount from "./components/OurServices/CreateGICAccount";
import GICAccountHome from "./components/OurServices/GICAccountPayment/GICAccountHome";
import SendMoneyAbroad from "./components/OurServices/SendMoneyAbroad/SendMoneyAbroad";
import ForexCurrencyExchange from "./components/OurServices/ForexCurrency";
import CookiePolicy from "./components/Legal/CookiePolicy";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import TermsOfUse from "./components/Legal/TermsOfUse";
import AdminNavbar from "./pages/Admin/AdminNavbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./pages/AdminLoginPage";
import AdminProtectedRoute from "./components/Auth/AdminProtectedRoute";

function App() {
  const {role,roleValue}=useSelector((state)=>state.auth)
   const { token } = useSelector((state) => state.auth);

  console.log("token",token,'roleValue',roleValue,'role',role);

  return (
    <div>
            {(role === 'admin' || roleValue==="admin")? <AdminNavbar username={"Admin"}/> : <Header className="sticky top-0"/>}

      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Home />
            //</ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
              </OpenRoute>
          }
        ></Route>
        <Route
          path="/cookie"
          element={
              <CookiePolicy />
          }
        ></Route>
        <Route
          path="/privacypolicy"
          element={
              <PrivacyPolicy />
          }
        ></Route>
        <Route
          path="/termsofuse"
          element={
              <TermsOfUse />
          }
        ></Route>

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login/>
              </OpenRoute>
          }
        ></Route>
        <Route path="creategicaccount" element={<CreateGICAccount />}></Route>
        <Route path="sendmoneyabroad" element={<SendMoneyAbroad />}></Route>
        <Route path="/trackandrecieve" element={<TrackShipment />}></Route>
        <Route path="prepaidtravelcard" element={<PrepaidTravelCard />}></Route>
        <Route path="forexcurrency" element={<ForexCurrencyExchange />}></Route>
        <Route path="nrirepatriation" element={<NRIRepatriation />}></Route>
        <Route
          path="blockedaccountpayment"
          element={<BlockedAccountHome />}
        ></Route>
        <Route path="gicaccountpayment" element={<GICAccountHome />}></Route>
        <Route
          path="overseaseducationLoan"
          element={<OverseasEducationLoan />}
        ></Route>
        <Route
          path="checkout"
          element={
            // <ProtectedRoute>
            <Checkout />
            // </ProtectedRoute>
          }
        ></Route>
        <Route path="settings" element={<Settings />}></Route>

        <Route element={<UserProfile />}>
          <Route path="/userprofile/my-profile" element={<MyProfile />} />

          <Route
            path="/userprofile/manage-address"
            element={<ManageProfileAddress />}
          />

          <Route
            path="/userprofile/profile-settings"
            element={<UpdatePassword />}
          />

          <Route path="/userprofile/edit-profile" element={<Settings />} />
        </Route>

        <Route path="/admin/login" element={<LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />

        <Route path="/my-orders*" element={<MyOrders />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;