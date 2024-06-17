import React, { useState, useEffect } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import { apiConnector } from '../../services/operations/apiconnector';
const ManageOrder = () => {
  const {adminToken}=useSelector((state)=>state.auth)
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setisViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const[userOrder,setUserOrder]=useState();
  const [selectedServiceType, setSelectedServiceType] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const[selectedOrderId,setSelectedOrderId]=useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const statusList = [
    "Placed",
    "Shipped",
    "In Transit",
    "Delivered",
    "User Not Available",
    "Number Unreachable",
    "Wrong Address",
  ];

  const fetchUserOrders = async () => {
    const toastId = toast.loading("Loading orders...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", 'http://localhost:8100/api/v1/fetchAllOrders', null, {
        Authorization: `Bearer ${adminToken}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setOrders(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [adminToken]);

  const fetchInvididualOrder = async (orderId) => {
    const toastId = toast.loading("Loading orders...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", `http://localhost:8100/api/v1/fetchOrderById/${orderId}`, null, {
        Authorization: `Bearer ${adminToken}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setUserOrder(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const fetchOrderByServiceType = async (serviceType) => {
    const toastId = toast.loading("Loading orders...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", `http://localhost:8100/api/v1/fetchOrderByServiceType/${serviceType}`, null, {
        Authorization: `Bearer ${adminToken}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setFilteredOrders(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [adminToken]);

  useEffect(() => {
    if (selectedServiceType !== "All") {
      fetchOrderByServiceType(selectedServiceType);
    } else {
      setFilteredOrders(orders);
    }
  }, [selectedServiceType, orders]);

  const handleServiceTypeChange = (e) => {
    setSelectedServiceType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAndSearchedOrders = filteredOrders.filter(order => 
    order.orderId.includes(searchQuery) ||
    order.placedBy.includes(searchQuery)
  );

    const totalPages = Math.ceil(filteredAndSearchedOrders.length / itemsPerPage);
  const displayedOrders = filteredAndSearchedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = async () => {
    if (!selectedStatus) {
      alert('Please select a status');
      return;
    }

    try {
      const response = await apiConnector('PUT', `http://localhost:8100/api/v1/updateOrder/${selectedOrderId}`, {
        orderStatus: selectedStatus,
      },{
        Authorization: `Bearer ${adminToken}`,
      });

      console.log('response',response);

      if (response.data.success) {
        alert('Order status updated successfully');
        closeModal();
        fetchUserOrders();
      } else {
        console.log('error',response.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  console.log('orderId',selectedOrderId);

  return (
    <>
      <body className="antialiased font-sans bg-gray-200">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                onChange={handleServiceTypeChange}
                >
                  <option>All</option>
                  <option value="SendMoneyAbroad">Send Money Abroad</option>
                  <option value="Forex Currency Exchange">Forex Currency Exchange</option>
                  <option value="NRIRepatriation">NRI Repatriation</option>
                  <option value="BlockedAccountPayment">Blocked Account Payment</option>
                  <option value="GICAccountPayment">GIC Account Payment</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order Id
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Placed By
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estimated Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      displayedOrders?.map((currItem)=>{
                        return(
                        <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {currItem?.orderId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {currItem?.placedBy}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {currItem?.orderType}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {currItem?.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {currItem?.estimatedDelivery}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{currItem?.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex gap-5">
                          <FaEye
                            className="cursor-pointer"
                            title="View Order"
                            onClick={() => {
                              fetchInvididualOrder(currItem?.orderId);
                              setisViewModalOpen(!isViewModalOpen);
                            }}
                          />
                          <FaEdit
                            className="cursor-pointer"
                            title="Update Order"
                            onClick={()=>{
                              setSelectedOrderId(currItem?.orderId)
                              openModal();
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                        )
                      })
                   
}
                    
                  </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">
                   Showing {currentPage} of {totalPages} Pages
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                    <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                     disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Update Modal*/}
        {isModalOpen && (
          <div className="fixed inset-0 w-[100%] flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Modal */}
            <div className="bg-white rounded-lg p-8 z-50 w-[30%]">
              <h2 className="text-lg font-semibold mb-4">
                Update Order Status
              </h2>
              <hr />
              <div className="mt-5">
                <select className="w-full ml-2 px-2 py-1 border rounded"
              value={selectedStatus}
              onChange={handleStatusChange}
                >
                   <option value="">Select status</option>
                  {statusList.map((statusItem) => (
                    <option key={statusItem} value={statusItem}>
                      {statusItem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 mt-10">
                <button className="border border-richblack-700 text-white bg-[#d40511]  px-[12px] py-[8px] text-richblack-100 rounded-md  hover:bg-[#d40511]"
                onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="border border-richblack-700 text-white bg-[#d40511]  px-[12px] py-[8px] text-richblack-100 rounded-md  hover:bg-[#d40511]"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* End of Modal */}

        {/* Modal View Modal*/}
        {isViewModalOpen && (
          <div className="fixed inset-0 w-[100%] flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Modal */}
            <div className="bg-white rounded-lg p-8 z-50 md:w-[30%]">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <hr />
              <div className="mt-5">
                <p>
                  <span className="font-bold">Order Id:</span> {userOrder?.orderId}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Order Placed By:</span> {userOrder?.serviceType}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Order Type:</span> {userOrder?.serviceType}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Placed At:</span> {userOrder?.createdAt}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Estimated Delivery :</span>{" "}
                  {userOrder?.createdAt}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Status:</span> Placed
                </p>

                <p className="mt-2">
                  <span className="font-bold">
                    Here insert currency details:
                  </span>{" "}
                  {userOrder?.currency}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Here add amount:</span> {userOrder?.orderAmount}
                </p>
              </div>

              <div className="flex gap-3 mt-10 float-end">
                <button
                  className="border border-richblack-700 text-white bg-[#d40511]  px-[12px] py-[8px] text-richblack-100 rounded-md  hover:bg-[#d40511]"
                  onClick={() => {
                    setisViewModalOpen(!isViewModalOpen);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* End of View */}
      </body>
    </>
  );
};

export default ManageOrder;
