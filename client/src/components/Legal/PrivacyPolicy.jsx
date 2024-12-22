import React, { useEffect } from "react";
import Privacy from "./assets/img/privacy.jpg";
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="privacy-policy-container container mx-auto px-4">
        <h2 className="text-center my-4 text-3xl mt-10 mb-10 font-bold">
          Privacy Policy
        </h2>


        <div className="flex flex-row gap-2">

        <div className="gap-4 mt-5 w-[60%] privacy-text">
          <div className="p-4">

          <p>
              <strong>Privacy policy:</strong><br/>
              At Remiwire Forex Services Pvt Ltd, we value your trust and are committed to protecting your personal and financial information. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our services.
              </p>

              <h3 className="mt-4 font-bold">Collection of Information</h3>

              We collect the following types of information:
              <ul>
              <li>1. Personal Information: Name, email address, phone number, address, and identification documents.</li>
              <li>2. Financial Information: Bank account details, credit/debit card information, and transaction history.</li>
              <li>3. Non-Personal Information: IP address, browser type, operating system, and device information.</li>
              </ul>

              <h3 className="mt-4 font-bold">Use of Information</h3>
              We use your information for the following purposes:
              <ul>
              <li>1. Facilitating Transactions: To process transactions, verify identity, and prevent fraud.</li>
              <li>2. Customer Support: To respond to inquiries, resolve issues, and provide support.</li>
              <li>3. Marketing and Promotions: To offer personalized promotions, discounts, and services.</li>
              <li>4. Compliance with Regulations: To comply with anti-money laundering (AML), know-your-customer (KYC), and other regulatory requirements.</li>
              </ul>

              <h3 className="mt-4 font-bold">Sharing and Disclosure of Information</h3>
              We may share your information with:
              <ul>
              <li>1. Authorized Personnel: Our employees, agents, and contractors who require access to your information.</li>
              <li>2. Third-Party Service Providers: Our partners, vendors, and service providers who assist us in providing services.</li>
              <li>3. Regulatory Bodies: Government agencies, law enforcement, and regulatory bodies as required by law.</li>
              </ul>

              <h3 className="mt-4 font-bold">Data Security</h3>
              We implement robust security measures to protect your information, including:
              <ul>
              <li>1. Encryption: We use industry-standard encryption to protect your data.</li>
              <li>2. Firewalls: We use firewalls to prevent unauthorized access.</li>
              <li>3. Access Controls: We restrict access to authorized personnel.</li>
              </ul>

              <h3 className="mt-4 font-bold">Cookies and Tracking</h3>
              We may use cookies and other tracking technologies to collect non-personal information and improve your experience.

              Your Rights
              You have the right to:
              <ul>
              <li>1. Access Your Information: Request access to your personal and financial information.</li>
              <li>2. Correct Your Information: Request corrections to your information.</li>
              <li>3. Opt-out of Marketing: Opt-out of receiving marketing communications.</li>

              </ul>

              <h3 className="mt-4 font-bold">Changes to This Policy</h3>
              <ul>
              <li>We reserve the right to update this policy at any time. Changes will be effective immediately upon posting.
              Contact Us</li>
              <li>If you have any questions or concerns about this policy, please contact us at [Hello@remiwireforexservices.com] or [+91 7304902384].</li>

              <li>By using our services, you acknowledge that you have read, understood, and agree to be bound by this privacy policy.</li>
              </ul>
            </div>

          </div>

          <div className="p-4 w-[40%]">
            <img src={Privacy} alt="Privacy Policy" className="w-full" />
          </div>

          </div>

        </div>
    </>
  );
}
