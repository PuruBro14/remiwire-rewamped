import React, { useState, useEffect } from "react";
import AchivementImg1 from '../assets/images/AchievementsOne.svg'
import AchivementImg2 from '../assets/images/AchievementsTwo.svg'
import AchivementImg3 from '../assets/images/AchievementsThree.svg'

export default function OurAchivements() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 450) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [count]);
  return (
    <div>
      <div className="bg-stone-100">
        <h1 className="ourserhead text-center">
          OUR ACHIEVEMENTS
        </h1>
        <div className="flex justify-center ">
          <div className="w-1/4 m-4 my-16 flex flex-col items-center">
            <img
              src={AchivementImg1}
              className="w-32 h-32"
            />
            <h3 className="text-center text-2xl font-bold text-indigo-950 py-2">
              Happy Customers
            </h3>
            <h1 className="text-center text-3xl font-bold text-emerald-800 py-2">
              {count}+
            </h1>
          </div>
          <div className="w-1/4 m-4 my-16 flex flex-col items-center">
            <img
              src={AchivementImg3}
              className="w-32 h-32"
            />
            <h3 className="text-center text-2xl font-bold text-indigo-950 py-2">
              Exchanged so far
            </h3>
            <h1 className="text-center text-3xl font-bold text-emerald-800 py-2">
              $6.1mil+
            </h1>
          </div>
          <div className="w-1/4 m-4 my-16 flex flex-col items-center">
            <img
              src={AchivementImg2}
              className="w-32 h-32"
            />
            <h3 className="text-center text-2xl font-bold text-indigo-950 py-2">
              Transactions
            </h3>
            <h1 className="text-center text-3xl font-bold text-emerald-800 py-2">
              {count}+
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}