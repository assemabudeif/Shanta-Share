import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../Network/AxiosInstance';
import LoadingComp from '../Components/LoadingComp';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

function DashBoardOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingOrder, setEditingOrder] = useState(null);
    const [form, setForm] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);
    const ordersPerPage = 5;
    const token = localStorage.getItem("token");
    const loader = useSelector(state => state.loader.loader);
    const [loading, setLoading] = useState(true);
    const [governments, setGovernments] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchGovernments = async () => {
        try {
            const response = await AxiosInstance.get('/governments/');
            const data = await response.json();
            setGovernments(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching governments:', error);
        }
    };

    useEffect(() => {
        fetchGovernments();
    }, []);

    useEffect(() => {
        if (form.government) {
            // Fetch cities based on the selected government
            AxiosInstance.get(`/cities?government_id=${form.government}`)
                .then(response => response.json())
                .then(data => setCities(data))
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [form.government]);

    const fetchOrders = () => {
        setLoading(true);
        AxiosInstance.get('http://127.0.0.1:8000/orders/admin/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data;
                setOrders(data.data);
                setTotalPages(Math.ceil(data.data.length / ordersPerPage));
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setOrders([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    if (loading) {
        return <LoadingComp />;
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openDeleteModal = (orderId) => {
        setOrderIdToDelete(orderId);
        setIsModalOpen(true);
    };

    // ========== Handling Delete ==========

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/orders/admin/?order_id=${orderIdToDelete}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    setAlert({ message: 'Order deleted successfully', type: 'success' });

                    setTimeout(() => {
                        setAlert({ message: '', type: '' });
                    }, 5000);
                } else {
                    setAlert({ message: 'Failed to delete order', type: 'error' });
                }
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
            created_by: order.client?.name || 'Unknown',
            from_city: order.post?.from_city || 'Unknown',
            to_city: order.post?.to_city || 'Unknown',
            pickup_time: order.pickup_time || '',
            status: order.status,
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

        AxiosInstance.patch(`/orders/admin/?order_id=${form.id}`,
            data = {
                // created_by: form.client?.name || 'Unknown',
                // from_city: form.post?.from_city?.name || 'Unknown',
                // to_city: form.post?.to_city?.name || 'Unknown',
                // pickup_time: form.pickup_time || '',
                status: form.status,
            },)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.detail || 'Failed to update order');
                    });
                }
                setAlert({ message: 'Order updated successfully', type: 'success' });
                fetchOrders();
                setEditingOrder(null);
            })
            .catch(error => {
                console.error('Error updating order:', error);
                setAlert({ message: 'Error updating order', type: 'error' });
            });
    };

    if (loader) {
        return <LoadingComp />;
    }


    return (
        <div className="p-4 text-sm">
            {alert.message && (
                <div className={`p-4 mb-4 text-sm text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`} role="alert">
                    {alert.message}
                </div>
            )}
            <div>
                {orders.length > 0 ? (
                    <>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Client Name</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">From</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">To</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pickup Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.client?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.post?.from_city?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{order.post?.to_city?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{new Date(order.pickup_time).toLocaleString()}</td>
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
                                {/* <input
                                    type="text"
                                    name="id"
                                    value={form.id}
                                    readOnly
                                    className="border p-2 mb-2 rounded-md w-full"
                                /> */}
                                <input
                                    type="text"
                                    name="client_name"
                                    placeholder='Client Name'
                                    value={form.client_name}
                                    readOnly
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                {/* <input
                                    type="text"
                                    name="from_city"
                                    value={form.from_city}
                                    onChange={handleFormChange}
                                    placeholder="From City"
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    name="to_city"
                                    value={form.to_city}
                                    onChange={handleFormChange}
                                    placeholder="To City"
                                    className="border p-2 mb-2 rounded-md w-full"
                                /> */}
                                <input
                                    type="datetime-local"
                                    name="pickup_time"
                                    placeholder='Pickup Time'
                                    value={form.pickup_time}
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
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setEditingOrder(null)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this order?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Delete
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">
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
