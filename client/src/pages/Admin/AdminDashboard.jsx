import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { apiConnector } from '../../services/operations/apiconnector';
import { useSelector } from 'react-redux';
import './dashboard.css';

const AdminDashboard = () => {
  const [apiData, setApiData] = useState({
    SendMoneyAbroad: [],
    ForexCurrencyExchange: [],
    NRIRepatriation: [],
    BlockedAccountPayment: [],
    GICAccountPayment: [],
    OverseasEducationLoan: [],
  });

  const { token } = useSelector((state) => state.auth);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [loading, setLoading] = useState(true);

  const pieChartData = {
    labels: [
      'Send Money Abroad', 
      'Forex Currency Exchange', 
      'NRI Repatriation', 
      'Blocked Account Payment', 
      'GIC Account Payment', 
      'Overseas Education Loan'
    ],
    datasets: [
      {
        label: 'Pie Chart Data',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5733'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5733'],
        data: [
          apiData?.SendMoneyAbroad?.length,
          1,
          apiData?.NRIRepatriation?.length,
          apiData?.BlockedAccountPayment?.length,
          1,
          1,
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
      'GIC Account Payment', 
      'Overseas Education Loan'
    ],
    datasets: [
      {
        label: 'Bar Chart Data',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5733'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5733'],
        data: [
          apiData.SendMoneyAbroad.reduce((total, order) => total + order.orderAmount, 0),
          1,
          apiData.NRIRepatriation.reduce((total, order) => total + order.orderAmount, 0),
          1,
          1,
          1,
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
        const response = await apiConnector('GET', `http://localhost:8100/api/v1/adminOrders?month=${new Date(Date.parse(selectedMonth + " 1, 2024")).getMonth() + 1}&year=${selectedYear}`, null, {
          Authorization: `Bearer ${token}`,
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

  console.log('apiData', apiData?.SendMoneyAbroad);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader">Loading...</div> {/* You can use any loading spinner component or CSS animation */}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-around items-center mb-6">
            {pieChartData.labels.map((label, index) => (
              <div 
                key={index} 
                className={`w-48 h-40 card ${index % 3 === 1 ? 'bg-c-blue' :index % 3 === 2 ? 'bg-c-yellow' : 'bg-c-green'}`}
              >
                <div className="card-block">
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <p className="text-gray-600">Data: {pieChartData.datasets[0].data[index]}</p>
                </div>
              </div>
            ))}
          </div>
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
