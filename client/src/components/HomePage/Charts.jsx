import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";


const CurrencyGraph = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/1902e21487d17680cb9fc088/latest/INR"
        );
        setExchangeRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  console.log(exchangeRates);

  // Render chart based on exchangeRates data
  return (
    <div className="h-[500px] w-8/12 mx-auto relative bottom-5">
      <h1>Live Currency Exchange Rates</h1>
      <Line
        data={{
          labels: Object.keys(exchangeRates),
          datasets: [
            {
              label: "Currency Rates",
              data: Object.values(exchangeRates),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};

export default CurrencyGraph;
