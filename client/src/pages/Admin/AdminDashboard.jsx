import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { apiConnector } from '../../services/operations/apiconnector';
import { useSelector } from 'react-redux';
import './dashboard.css';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import Loader from "../../components/Loader"
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';
Chart.register(ArcElement);

const AdminDashboard = () => {
  const [apiData, setApiData] = useState({
    SendMoneyAbroad: [],
    ForexCurrencyExchange: [],
    NRIRepatriation: [],
    BlockedAccountPayment: [],
    GICAccountPayment: []
  });

  const { adminToken } = useSelector((state) => state.auth);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [loading, setLoading] = useState(true);

  const pieChartData = {
    labels: [
      'Send Money Abroad', 
      'Forex Currency Exchange', 
      'NRI Repatriation', 
      'Blocked Account Payment', 
      'GIC Account Payment'
    ],
    datasets: [
      {
        label: 'Pie Chart Data',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        data: [
          apiData?.SendMoneyAbroad?.length,
          apiData?.ForexCurrencyExchange?.length,
          apiData?.NRIRepatriation?.length,
          apiData?.BlockedAccountPayment?.length,
          apiData?.GICAccountPayment?.length
        ],
      },
    ],
  };

  const barChartData = {
    labels: [
      'Send Money Abroad', 
      'Forex Currency Exchange', 
      'NRI Repatriation', 
      'Blocked Account Payment', 
      'GIC Account Payment'
    ],
    datasets: [
      {
        label: 'Bar Chart Data',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        data: [
          apiData.SendMoneyAbroad.reduce((total, order) => total + order.orderAmount, 0),
          apiData?.ForexCurrencyExchange?.length,
          apiData.NRIRepatriation.reduce((total, order) => total + order.orderAmount, 0),
          apiData.BlockedAccountPayment.reduce((total, order) => total + order.orderAmount, 0),
          apiData.GICAccountPayment.reduce((total, order) => total + order.orderAmount, 0)
        ],
      },
    ],
  };

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await apiConnector('GET', `http://13.50.14.42:8100/api/v1/adminOrders?month=${new Date(Date.parse(selectedMonth + " 1, 2024")).getMonth() + 1}&year=${selectedYear}`, null, {
          Authorization: `Bearer ${adminToken}`,
        });
        console.log('data', response);
        setApiData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  console.log('apiData', apiData);

  const getIcon = (index) => {
    switch (index % 3) {
      case 0:
        return <FaChartPie className="text-4xl text-white mb-2" />;
      case 1:
        return <FaChartBar className="text-4xl text-white mb-2" />;
      case 2:
        return <FaChartLine className="text-4xl text-white mb-2" />;
      default:
        return <FaChartPie className="text-4xl text-white mb-2" />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="flex mb-6">
            <select value={selectedMonth} onChange={handleMonthChange} className="mr-4 p-2 border border-gray-300 rounded-md">
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={new Date(2024, index).toLocaleString('default', { month: 'long' })}>
                  {new Date(2024, index).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select value={selectedYear} onChange={handleYearChange} className="p-2 border border-gray-300 rounded-md">
              {Array.from({ length: 5 }, (_, index) => (
                <option key={index} value={2024 - index}>
                  {2024 - index}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap justify-around items-center mb-6">
            {pieChartData.labels.map((label, index) => (
              <div 
                key={index} 
                className={`w-56 h-56 card m-4 p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 
                            ${index % 3 === 1 ? 'bg-c-blue' : index % 3 === 2 ? 'bg-c-yellow' : 'bg-c-green'}`}
              >
                <div className="card-block text-center flex flex-col items-center justify-center h-full">
                  {getIcon(index)}
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <p className="text-gray-200">Data: {pieChartData.datasets[0].data[index]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-around items-center">
            <div className="w-full md:w-1/2 h-96 p-4">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Pie Chart',
                    },
                  },
                }}
              />
            </div>
            <div className="w-full md:w-1/2 h-96 p-4">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Bar Chart',
                    },
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
