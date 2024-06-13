import React, { useState,useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { apiConnector } from '../../services/operations/apiconnector';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const [apiData, setApiData] = useState({
  SendMoneyAbroad: [],
  ForexCurrencyExchange: [],
  NRIRepatriation: [],
  BlockedAccountPayment: [],
  GICAccountPayment: [],
  OverseasEducationLoan: [],
});

const {token}=useSelector((state)=>state.auth)

  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');

  const pieChartData = {
    labels: ['Send Money Abroad', 'Forex Currency Exchange', 'NRI Repatriation', 'Blocked Account Payment', 'GIC Account Payment', 'Overseas Education Loan'],
    datasets: [
      {
        label: 'Pie Chart Data',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        data: [
        apiData?.SendMoneyAbroad?.length,1,apiData?.NRIRepatriation?.length,apiData?.blockedAccount?.length,1,1
      ],
      },
    ],
  };

  const barChartData = {
    labels: ['Send Money Abroad', 'Forex Currency Exchange', 'NRI Repatriation', 'Blocked Account Payment', 'GIC Account Payment', 'Overseas Education Loan'],
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
        1
      ],
      },
    ],
  };

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiConnector("GET", 'http://localhost:8100/api/v1/userOrders', null, {
        Authorization: `Bearer ${token}`,
      });
      console.log('data',response);
      setApiData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [selectedMonth, selectedYear]);

console.log('apiData',apiData?.SendMoneyAbroad);


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: '20px' }}>
        {pieChartData.labels.map((label, index) => (
          <div key={index} style={{ width: '200px', height: '150px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>{label}</h3>
            <p>Data: {pieChartData.datasets[0].data[index]}</p>
          </div>
        ))}
      </div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={new Date(2024, index).toLocaleString('default', { month: 'long' })}>
            {new Date(2024, index).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>

      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: 5 }, (_, index) => (
          <option key={index} value={2024 - index}>
            {2024 - index}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: '20px' }}>
        <div style={{ width: '50%', height: '400px' }}>
          <h2>Pie Chart</h2>
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
        <div style={{ width: '50%', height: '400px', marginTop: '50px' }}>
          <h2>Bar Chart</h2>
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
    </div>
  );
};

export default AdminDashboard;
