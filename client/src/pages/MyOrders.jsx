import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconBtn from '../components/common/IconBtn';
import { VscAdd } from "react-icons/vsc";
import OrdersTable from '../components/core/OrdersTable';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/operations/apiconnector';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css';
import styles from './styles.module.css'; 

const MyOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [forexOrders, setForexOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const[forexCurrencyTab,setForexCurrencyTab]=useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchUserOrders = async () => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", 'http://localhost:8100/api/v1/userOrders', null, {
        Authorization: `Bearer ${token}`,
      }); 
      setLoading(false);
      toast.dismiss(toastId);
      setUserOrders(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const fetchForexOrders = async () => {
    const toastId = toast.loading("Loading Forex orders...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", 'http://localhost:8100/api/v1/fetchAllBookOrders', null, {
        Authorization: `Bearer ${token}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setForexOrders(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [token]);

  const serviceTypes = [
    'Send Money Abroad',
    'Forex Currency',
    'NRI Repatriation',
    'Blocked Account Payment',
    'GIC Account Payment',
    'Overseas Education Loan',
  ];

  const renderOrders = (serviceType) => {
    if (serviceType === 'Forex Currency') {
      return forexOrders.length ? (
        <OrdersTable userOrders={forexOrders} loading={loading} />
      ) : (
        'No orders found'
      );
    }
    const backendServiceType = mapToFrontendToBackend(serviceType); 
    const serviceOrders = userOrders[backendServiceType] || [];
    return serviceOrders.length ? (
      <OrdersTable userOrders={serviceOrders} loading={loading} />
    ) : (
      'No orders found'
    );
  };

  const mapToFrontendToBackend = (frontendServiceType) => {
    switch (frontendServiceType) {
      case 'Send Money Abroad':
        return 'SendMoneyAbroad';
      case 'Forex Currency':
        return 'forexCurrency';
      case 'NRI Repatriation':
        return 'NRIRepatriation';
      case 'Blocked Account Payment':
        return 'BlockedAccountPayment';
      case 'GIC Account Payment':
        return 'GICAccountPayment';
      case 'Overseas Education Loan':
        return 'OverseasEducationLoan';
      default:
        return frontendServiceType; 
    }
  };

  return (
    <div className={`mb-14 ${styles['tabs-container']}`}>
      <div className='my-14 flex items-center justify-between w-11/12 mx-auto'>
        <h1 className='text-3xl font-medium text-richblack-800'>My Orders</h1>
        <IconBtn
          text="Buy Currency"
          onClick={() => navigate("/")}
          className={styles['icon-btn']}
        >
          <VscAdd />
        </IconBtn>
      </div>
      <Tabs onSelect={(index) => {
        if (serviceTypes[index] === 'Forex Currency') {
          fetchForexOrders();
        }
      }}>
        <TabList className={styles['tab-list']}>
          {serviceTypes.map((service, index) => (
            <Tab key={index} className={styles['tab']} selectedClassName={styles['tab--selected']}>{service}</Tab>
          ))}
        </TabList>
        {serviceTypes.map((service, index) => (
          <TabPanel key={index}>
            {renderOrders(service)}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default MyOrders;
