import React, { useEffect } from "react";
import Terms from "./assets/img/terms.jpg";
export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="text-center my-4 text-3xl mt-10 mb-10 font-bold">
          Terms Of Use
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="p-4">
            <div>
              <div className="font-semibold text-[26px]">
                Information Collection And Use
              </div>
              <div className="text-[14px] mt-3">
                While using our Site, we may ask you to provide us with certain
                personally identifiable information that can be used to contact
                or identify you. Personally identifiable information may
                include, but is not limited to, your name, email address, postal
                address, and phone number ("Personal Information").
              </div>
            </div>
            <div className="mt-10">
              <div className="font-semibold text-[26px]">Log Data</div>
              <div className="text-[14px] mt-3">
                Like many site operators, we collect information that your
                browser sends whenever you visit our Site ("Log Data"). This Log
                Data may include information such as your computer's Internet
                Protocol ("IP") address, browser type, browser version, the
                pages of our Site that you visit, the time and date of your
                visit, the time spent on those pages, and other statistics.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">Cookies</div>
              <div className="text-[14px] mt-3">
                Cookies are files with small amount of data, which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a web site and stored on your computer's hard drive. Like
                many sites, we use "cookies" to collect information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Site.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">Security</div>
              <div className="text-[14px] mt-3">
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </div>
            </div>

            <div className="mt-10">
              <div className="font-semibold text-[26px]">
                Changes To This Privacy Policy
              </div>
              <div className="text-[14px] mt-3">
                This Privacy Policy is effective as of 01/01/2024 and will
                remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page. We reserve the right to update
                or change our Privacy Policy at any time and you should check
                this Privacy Policy periodically. Your continued use of the
                Service after we post any modifications to the Privacy Policy on
                this page will constitute your acknowledgment of the
                modifications and your consent to abide and be bound by the
                modified Privacy Policy.
              </div>
            </div>
          </div>
          <div className="p-4">
            <img src={Terms} alt="Terms Of Use" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
