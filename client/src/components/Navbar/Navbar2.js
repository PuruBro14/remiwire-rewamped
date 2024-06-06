 <ul className="flex md:flex-row flex-col gap-3 lg:gap-5 text-black text-sm">
                {NavbarLinks?.map((ele, index) => {
                  if (ele?.title === "Settings" && !token) {
                    return null;
                  }
                  if (ele?.title === "My Orders" && !token) {
                    return null;
                  }
                  return (
                    <li key={index} onClick={closeNavbar}>
                      {ele?.title === "Services" ? (
                        <div>
                          <div
                            className="relative flex flex-row gap-2 items-center group"
                            onClick={() =>
                              setShowMobileServices(!showMobileServices)
                            }
                          >
                            <p>{ele?.title}</p>
                            <IoIosArrowDropdownCircle />
                            <div className="z-20 invisible absolute left-[50%] top-[0%] opacity-0 md:top-[50%] -translate-x-[50%] md:translate-y-[20%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                              <div className="absolute left-[50%] translate-x-[80%] -translate-y-[45%] top-0 h-6 w-6  rounded rotate-45 bg-richblack-5"></div>
                              {subLinksData?.map((ele, index) => {
                                {
                                }
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
                        </div>
                      ) : (
                        <Link to={ele?.title !== "Contact Us" ? ele?.path : ""}>
                          <p
                            onClick={(e) => {
                              if (ele?.title === "Contact Us") {
                                handleContactus(e);
                              }
                            }}
                          >
                            {ele.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

  // <ul className="flex md:flex-row flex-col gap-3 lg:gap-5 text-black text-sm">
  //   {NavbarLinks?.map((ele, index) => {
  //     if (ele?.title === "Settings" && !token) {
  //       return null;
  //     }
  //     if (ele?.title === "My Orders" && !token) {
  //       return null;
  //     }
  //     return (
  //       <li key={index} onClick={closeNavbar}>
  //         <Link to={ele?.title !== "Contact Us" ? ele?.path : ""}>
  //           <p
  //             onClick={(e) => {
  //               if (ele?.title === "Contact Us") {
  //                 handleContactus(e);
  //               }
  //             }}
  //           >
  //             {ele.title}
  //           </p>
  //         </Link>
  //       </li>
  //     );
  //   })}
  //   {/* Show all services directly in mobile view */}
  //   {showHamburger &&
  //     subLinksData.map((subEle, subIndex) => (
  //       <li key={subIndex} onClick={closeNavbar}>
  //         <Link to={subEle?.link}>
  //           <p>{subEle?.title}</p>
  //         </Link>
  //       </li>
  //     ))}
  // </ul>;