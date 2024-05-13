import React, { useEffect } from "react";
import Cookie from "./assets/img/cookie.jpg";
export default function CookiePolicy() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="text-center my-4 text-3xl mt-10 mb-10 font-bold">
          Cookie Policy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="p-4">
            <div>
              <div className="font-semibold text-[26px]">
                How We Use Cookies
              </div>
              <div className="text-[14px] mt-3">
                We use cookies for a variety of reasons detailed below.
                Unfortunately in most cases there are no industry standard
                options for disabling cookies without completely disabling the
                functionality and features they add to this site. It is
                recommended that you leave on all cookies if you are not sure
                whether you need them or not in case they are used to provide a
                service that you use.
              </div>
            </div>
            <div className="mt-10">
              <div className="font-semibold text-[26px]">Disabling Cookies</div>
              <div className="text-[14px] mt-3">
                You can prevent the setting of cookies by adjusting the settings
                on your browser (see your browser Help for how to do this). Be
                aware that disabling cookies will affect the functionality of
                this and many other websites that you visit. Disabling cookies
                will usually result in also disabling certain functionality and
                features of this site. Therefore, it is recommended that you do
                not disable cookies.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">
                The Cookies We Set
              </div>
              <div className="text-[14px] mt-3">
                If you create an account with us, then we will use cookies for
                the management of the signup process and general administration.
                These cookies will usually be deleted when you log out; however,
                in some cases they may remain afterwards to remember your site
                preferences when logged out.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">
                Login related cookies
              </div>
              <div className="text-[14px] mt-3">
                We use cookies when you are logged in so that we can remember
                that you are logged in. This prevents you from having to log in
                every single time you visit a new page. These cookies are
                typically removed or cleared when you log out to ensure that you
                can only access restricted features and areas when logged in.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">
                Email newsletters related cookies
              </div>
              <div className="text-[14px] mt-3">
                This site offers newsletter or email subscription services and
                cookies may be used to remember if you are already registered
                and whether to show certain notifications which might only be
                valid to subscribed/unsubscribed users.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">
                Forms related cookies
              </div>
              <div className="text-[14px] mt-3">
                When you submit data to us through a form such as those found on
                contact pages or comment forms, cookies may be set to remember
                your user details for future correspondence.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">Essential cookies</div>
              <div className="text-[14px] mt-3">
                Essential cookies and scripts are essential for our website to
                function. They allow visitors to move around our website and use
                its basic features, such as accessing secure areas of the
                website, opening navigation, and displaying content.
              </div>
            </div>
          </div>
          <div className="p-4">
            <img src={Cookie} alt="Cookie Policy" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
