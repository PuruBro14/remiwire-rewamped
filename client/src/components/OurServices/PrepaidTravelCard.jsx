import React from "react";
import image1 from "./assets/img/prepaid.jpg";

export default function PrepaidTravelCard() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center my-4 text-3xl mt-10 mb-10">
        PREPAID TRAVEL CARD
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <h5 className="text-2xl">
            Introducing Remiwire's Prepaid Travel Card
          </h5>
          <p className="mt-3">
            Travel smart and stress-free with the Remiwire Prepaid Travel Card.
            Whether you're jetting off for business or leisure, our travel card
            is your ultimate companion for seamless transactions worldwide.
          </p>
          <h5 className="text-2xl mt-5">Convenience at Your Fingertips</h5>
          <p className="mt-3">
            Say goodbye to the hassle of carrying cash or worrying about
            currency exchange rates. With our prepaid travel card, you can load
            multiple currencies onto a single card, giving you the flexibility
            to spend in local currency wherever you go.
          </p>
          <h5 className="text-2xl mt-5">Global Acceptance</h5>
          <p className="mt-3">
            From bustling city streets to remote beachside destinations, our
            travel card is accepted at millions of locations worldwide,
            including ATMs, restaurants, hotels, and shops. Enjoy the
            convenience of accessing your funds wherever your journey takes you.
          </p>
          <h5 className="text-2xl mt-5">Security and Peace of Mind</h5>
          <p className="mt-3">
            Travel with confidence knowing that your funds are protected against
            loss or theft. Our prepaid travel card comes with advanced security
            features, including EMV chip technology and PIN protection, keeping
            your money safe and secure throughout your travels.
          </p>
          <h5 className="text-2xl mt-5">Budget-Friendly Travel</h5>
          <p className="mt-3">
            Stay on budget and avoid overspending with our prepaid travel card.
            Easily track your expenses online or through our mobile app, and
            reload your card as needed, ensuring you always have access to funds
            without the risk of carrying excess cash.
          </p>
          Travel smart, travel with Remiwire.
        </div>
        <div className="p-4">
          <img src={image1} alt="Prepaid Travel Card" className="w-full" />
          <div className="ptc_para mt-4">
            <h5 className="mt-4 text-2xl">24/7 Customer Support</h5>
            <p className="mt-3">
              Whether you have questions about your card or need assistance
              while traveling, our dedicated customer support team is available
              around the clock to help you with any inquiries or concerns.
            </p>
            <h5 className="mt-4 text-2xl">
              Get Your Prepaid Travel Card Today
            </h5>
            <p className="mt-3">
              Experience the convenience and peace of mind of traveling with the
              Remiwire Prepaid Travel Card. Sign up today and start exploring
              the world with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
