import React, { useEffect, useRef, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { setScrollToComponentContact, setScrollToComponentSend } from "../../utils/scrollSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/operations/apiconnector";
import { contactUsEndPoint } from "../../services/apis";

export default function Contactus() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const { scrollToComponentSend,scrollToComponentContact } = useSelector((state) => state.scroll1);

  console.log("scrollToComponentSend", scrollToComponentContact);

  const { name, email, message } = formData;

  const formDataHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (scrollToComponentContact) {
      sectionRef.current.scrollIntoView({ behaviour: "smooth" });
      dispatch(setScrollToComponentContact(false))
    }
  });

  console.log('scrollToComponentContact',scrollToComponentContact,scrollToComponentSend);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      setLoading(true);

      const res = await apiConnector(
        "POST",
        contactUsEndPoint.CONTACT_US_API,
        formData
      );
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

   useEffect(() => {
    // Wait for component mount and check if the element exists
    const contactUsElement = document.getElementById("contactUs");
    if (contactUsElement) {
      console.log('contactUsElement',contactUsElement); // Debugging to ensure the element is found
    }
  }, []); // Empty dependency array means this effect runs only once after mount

  return (
    <>
      <div id="contactUs" ref={sectionRef}>
        <div className="relative w-11/12 max-w-maxContent mx-auto shadow-md my-6 p-5">
          {/* 1st section  */}
          <div className="flex flex-col gap-5 py-8 px-10 text-sm">
            <h1 className="text-3xl text-left">Contact Us</h1>
            <p className="text-[15px]">
              Feel Free to contact us any time. We will get back to you as soon
              as we can!.
            </p>

            <form
              className="flex flex-col gap-2 w-full md:w-[60%] leading-10"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="w-full border-b outline-none"
                  value={name}
                  onChange={formDataHandler}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full border-b outline-none"
                  value={email}
                  onChange={formDataHandler}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  id="message"
                  cols="3"
                  rows="1"
                  placeholder="Message"
                  className="w-full border-b outline-none"
                  value={message}
                  onChange={formDataHandler}
                />
              </div>

              <button
                type="submit"
                className="bg-[#d40511] text-white text-center px-[14px] py-[10px] cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>

          {/* 2nd section  */}

          <div className="hidden absolute right-0 bottom-0 bg-[#2D2D2D] rounded-lg w-[30%] p-5 h-full text-white md:flex flex-col gap-3 text-sm">
            <h1>Contact Info</h1>
            <div className="flex flex-row items-center gap-2">
              <FaMobileAlt size={20} />
              <p>+91 80090 54294</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MdMarkEmailUnread size={20} />
              <p>info@flightmantra.com</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <FaMapLocationDot size={35} />
              <p>
                1000+ Travel partners and 65+ Service city across India, USA,
                Canada & UAE
              </p>
            </div>
            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28056.15784306134!2d77.03925108820408!3d28.47895244790074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d190620c04113%3A0xbdfc86c8d87abd84!2sSector%2017%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1712383995998!5m2!1sen!2sin"
                width="100%"
                height="200"
                // style="border:0;"
                allowFullScreen
                // loading="lazy"
                // referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
