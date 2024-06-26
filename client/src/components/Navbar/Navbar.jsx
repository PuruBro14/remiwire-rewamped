import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/NavbarLinks";
import { useLocation } from "react-router-dom";
import { IoIosArrowDropdownCircle, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../ProfileDropDown";
import { logout } from "../../services/operations/authAPI";
import { RxHamburgerMenu } from "react-icons/rx";
import { setScrollToComponentContact } from "../../utils/scrollSlice";

const subLinksData = [
  {
    title: "Send Money Abroad",
    link: "sendmoneyabroad",
  },
  {
    title: "Prepaid Travel Card",
    link: "prepaidtravelcard",
  },
  {
    title: "Forex Currency",
    link: "forexcurrency",
  },
  {
    title: "NRI Repatriation",
    link: "NRIRepatriation",
  },
  {
    title: "Blocked Account Payment",
    link: "BlockedAccountPayment",
  },
  {
    title: "GIC Account Payment",
    link: "gicaccountpayment",
  },
  {
    title: "Overseas Education Loan",
    link: "OverseasEducationLoan",
  },
  {
    title: "Create GIC Account",
    link: "creategicaccount",
  },
];

const Navbar = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token  = localStorage.getItem("token");
  const adminToken= localStorage.getItem("adminToken")

  console.log('hahahhahaha',document.getElementById("contactUs"));

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setShowHamburger(isMobile);
      setIsOpen(!isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const scrollToContactUs = () => {
       dispatch(setScrollToComponentContact(true))
      }

  return (
    <div className="flex h-20 items-center w-full justify-center transition-all duration-200">
      <div className="w-11/12 mx-auto items-center justify-between">
        {showHamburger && (
          <div className="mt-5 md:mt-0 text-right">
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <IoMdClose size={30} color="black" />
              ) : (
                <RxHamburgerMenu size={30} color="black" />
              )}
            </button>
          </div>
        )}

        <div className={`navbar-drawer ${isOpen ? "open" : ""}`}>
          {showHamburger && (
            <div className="drawer-header flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={closeNavbar}>
                <IoMdClose size={30} color="black" />
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mt-5 gap-2">
            <nav>
              <ul className="flex md:flex-row flex-col gap-1 lg:gap-3 text-black justify-center items-center text-sm">
                {NavbarLinks?.map((ele, index) => {
                  if (ele?.title === "Settings" && !token) {
                    return null;
                  }
                  if (ele?.title === "My Orders" && !token) {
                    return null;
                  }
                  if (showHamburger) {
                    return (
                      <li key={index} onClick={closeNavbar}>
                        {ele?.title === "Services" ? (
                          <div className="showHam"></div>
                        ) : (
                          <Link to={ele?.title !== "Contact Us" ? ele?.path : ""}>
                            <p
                              className={`py-2 ${ele?.title==="Settings"?'relative bottom-3':''}`}
                            >
                              {ele.title}
                            </p>
                          </Link>
                        )}
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} onClick={closeNavbar}>
                        {ele?.title === "Services" ? (
                          <div className="relative flex flex-row gap-2 items-center group">
                            <p>{ele?.title}</p>
                            <IoIosArrowDropdownCircle />
                            <div className="absolute invisible left-1/2 transform -translate-x-1/2 top-full mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                              <div className="absolute left-[60%] transform -translate-x-1/2 -translate-y-1/2 top-0 h-6 w-6 rotate-45 bg-richblack-5"></div>
                              {subLinksData?.map((ele, index) => {
                                return (
                                  <Link
                                    className="p-2 border-b-2 no-underline hover:no-underline"
                                    to={ele?.link}
                                    key={index}
                                  >
                                    <p>{ele?.title}</p>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <Link to={ele?.title !== "Contact Us" ? ele?.path : ""} onClick={ele?.title==="Contact Us"?scrollToContactUs:''}>
                            <p
                              className="py-2"
                            >
                              {ele.title}
                            </p>
                          </Link>
                        )}
                      </li>
                    );
                  }
                })}
                {showHamburger &&
                  subLinksData.map((subEle, subIndex) => (
                    <li key={subIndex} onClick={closeNavbar}>
                      <Link to={subEle?.link}>
                        <p className="py-2 relative">{subEle?.title}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-y-2 md:flex-row md:gap-y-0 mb-2 gap-x-1 lg:gap-x-3 items-center">
              {token === null && (
                <Link to="/login">
                  <button
                    className="border border-richblack-700 text-white bg-[#d40511] px-[12px] py-[8px] rounded-md hover:bg-[#b3050f]"
                    onClick={closeNavbar}
                  >
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <button
                    className="border border-richblack-700 text-white bg-[#d40511] px-[12px] py-[8px] rounded-md hover:bg-[#b3050f]"
                    onClick={closeNavbar}
                  >
                    Sign up
                </button>
                </Link>
              )}
              {token !== null && <ProfileDropDown closeNavbar={closeNavbar} />}
              {token !== null && (
                <button
                  className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"
                  onClick={() => dispatch(logout(navigate))}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
