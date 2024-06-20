import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../services/operations/apiconnector';
import Papa from 'papaparse';

const ManageUsers = () => {
  const { adminToken } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [userOrders, setUserOrders] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchUsers = async () => {
    const toastId = toast.loading("Loading Users...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", 'http://13.50.14.42:8100/api/v1/fetchAllUsers', null, {
        Authorization: `Bearer ${adminToken}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setOrders(response?.data?.data);
      setCurrentPage(1);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [adminToken]);

  const filteredOrders = orders.filter(order => 
    order.username.includes(searchQuery) ||
    order.username.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchIndividualUserOrders = async (userId) => {
    console.log('orderId----------->', userId);
    const toastId = toast.loading("Loading orders...");
    setLoading(true);
    try {
      const response = await apiConnector("GET", `http://13.50.14.42:8100/api/v1/users/${userId}/orders`, null, {
        Authorization: `Bearer ${adminToken}`,
      });
      setLoading(false);
      toast.dismiss(toastId);
      setUserOrders(response.data.data);
      openModal();
      console.log('response----->', response);
    } catch (error) {
      console.log('Error:', error);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    const filteredOrders = orders.map(order => ({
      username: order.username,
      firstName: order.firstName,
      lastName: order.lastName,
      address: order.address[0]?.city ? order.address[0]?.city + ',' + order.address[0]?.country : '',
      contactNo: order.additionalDetails.contactNumber ? order.additionalDetails.contactNumber : '',
      email: order.email,
    }));
    const csv = Papa.unparse(filteredOrders, {
      fields: ['username', 'firstName', 'lastName', 'address', 'contactNo', 'email']
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="antialiased font-sans bg-gray-200">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={downloadCSV}
            >
              Download CSV
            </button>
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
                      Username
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    displayedOrders.map((currItem) => (
                      <tr key={currItem._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {currItem?.username}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{currItem?.firstName?currItem?.firstName:'' + " " + currItem?.lastName?currItem?.lastName:''}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {currItem?.address[0]?.city ? currItem?.address[0]?.city + ',' + currItem?.address[0]?.country : ''}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{currItem?.additionalDetails?.contactNumber ? currItem?.additionalDetails?.contactNumber : ''}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{currItem?.email}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => fetchIndividualUserOrders(currItem?._id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEye size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {currentPage} to {totalPages} of {orders.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className={`text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-l`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    className={`text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border-t border-b border-r border-gray-400 rounded-r`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 max-h-[500px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Orders</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Service Type
                    </th>
                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  userOrders?.length===0 && <h2 className="mt-5 font-bold">No Orders Found For This User</h2>
                }
                  {userOrders.map((order) => {
                    console.log('order------->',order);
                   return <tr key={order._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{order._id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{order.serviceType}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{order.orderStatus}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{order.orderAmount}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </td>
                    </tr>
})}
                </tbody>
              </table>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
