import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../Network/AxiosInstance';
import LoadingComp from '../Components/LoadingComp';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

function DashBoardOrders() {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingOrder, setEditingOrder] = useState(null);
    const [form, setForm] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);
    const token = localStorage.getItem("token");
    const loader = useSelector(state => state.loader.loader);

    const fetchOrders = () => {
        AxiosInstance.get('/orders/admin/orders', {
            params: {
                page: currentPage
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data;
                setOrders(data.results);
                setTotalPages(data.page_count);
                setCurrentPage(data.current_page);
                if (alert.message) {
                    // setTimeout(() => {
                    //     setAlert({ message: '', type: '' });
                    //
                    // }, 3000)
                }
                setLoader(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoader(false);
                // setOrders([]);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openDeleteModal = (orderId) => {
        setOrderIdToDelete(orderId);
        setIsModalOpen(true);
    };

    // ========== Handling Delete ==========

    const handleDelete = () => {
        AxiosInstance.delete(`/orders/admin/?order_id=${orderIdToDelete}`)
            .then(response => {
                setAlert({ message: 'Order deleted successfully', type: 'success' });
                setTimeout(() => {
                    setAlert({ message: '', type: '' });
                }, 3000);
                fetchOrders();
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                setAlert({ message: 'Error deleting order', type: 'error' });

                // Clear alert after 5 seconds
                setTimeout(() => {
                    setAlert({ message: '', type: '' });
                }, 5000);
            })
            .finally(() => {
                setIsModalOpen(false);
                setOrderIdToDelete(null);
            });
    };


    // ========== Handling Edit ==========

    const handleEdit = (order) => {
        setEditingOrder(order);
        setForm({
            id: order.id,
            pickup_time: order.pickup_time || '',
            status: order.status || '',
            pickup_address_line: order.pickup_address_line || '',
            arrival_time: order.arrival_time || '',
            delivery_address_line: order.delivery_address_line || '',
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        AxiosInstance.patch(`/orders/admin/?order_id=${form.id}`, data = {
            pickup_time: form.pickup_time,
            status: form.status,
            pickup_address_line: form.pickup_address_line,
            arrival_time: form.arrival_time,
            delivery_address_line: form.delivery_address_line
        },
        )
            .then(response => {
                if (!response.ok) {
                    setAlert({ message: 'Order updated successfully', type: 'success' });
                    setEditingOrder(null);
                    fetchOrders();
                }
            })
            .catch(error => {
                console.error('Error updating order:', error);
                setAlert({ message: 'Error updating order', type: 'error' });
            });
    };

    if (loader || loading) {
        return (
            <>
                {alert.message && (
                    <div
                        className={`p-4 mb-4 text-sm text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}
                        role="alert">
                        {alert.message}
                    </div>

                )}
                <LoadingComp />
            </>
        );
    }


    return (
        <div className="p-4 text-sm">
            {alert.message && (
                <div
                    className={`p-4 mb-4 text-sm text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}
                    role="alert">
                    {alert.message}
                </div>
            )}
            <div>
                {orders.length > 0 ? (
                    <>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    {/* <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th> */}
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Client Name</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">From</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">To</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pickup Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Arrival Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Delivery Fee</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        {/* <td className="px-4 py-2 text-sm text-gray-800">{order.id}</td> */}
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.client?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.post?.from_city?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.post?.to_city?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{new Date(order.pickup_time).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-80">{new Date(order.arrival_time).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-80">{Math.round(order.post.delivery_fee)} EGP</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.status}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(order);
                                                }}
                                                className="text-white px-2 py-1 rounded-md bg-yellow-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteModal(order.id);
                                                }}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Edit Form */}
                        {editingOrder && (
                            <form onSubmit={handleFormSubmit} className="mt-4 bg-gray-100 p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Edit Order</h2>

                                <label className="block mb-2">Pickup Time</label>
                                <input
                                    type="datetime-local"
                                    name="pickup_time"
                                    placeholder='Pickup Time'
                                    value={form.pickup_time}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    name="pickup_address_line"
                                    placeholder="Pickup Address Line"
                                    value={form.pickup_address_line}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <label className="block mb-2">Arrival Time</label>
                                <input
                                    type="datetime-local"
                                    name="arrival_time"
                                    placeholder="Arrival Time"
                                    value={form.arrival_time}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    name="delivery_address_line"
                                    placeholder="Delivery Address Line"
                                    value={form.delivery_address_line}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <select
                                    name="status"
                                    value={form.status}
                                    placeholder="Status"
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded-md">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setEditingOrder(null)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
                                    Cancel
                                </button>
                            </form>
                        )}
                        {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages).keys()].map(pageNumber => (
                                <button
                                    key={pageNumber + 1}
                                    onClick={() => paginate(pageNumber + 1)}
                                    className={`py-1 px-3 mx-1 ${currentPage === pageNumber + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                >
                                    {pageNumber + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl mb-4 mb-10">
                            <center><strong>Confirm Deletion</strong></center>
                        </h2>
                        <p className="mb-4 text-xl">Are you sure you want to delete this order?</p>
                        <div className="flex justify-between items-center space-x-2 mt-10">
                            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                                Delete
                            </button>
                            <button onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashBoardOrders;
