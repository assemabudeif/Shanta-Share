import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoardOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingOrder, setEditingOrder] = useState(null);
    const [form, setForm] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' }); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [orderIdToDelete, setOrderIdToDelete] = useState(null); 

    const ordersPerPage = 5;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = () => {
        fetch(`http://127.0.0.1:8000/orders/admin/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data.data)) {
                setOrders(data.data);
                setTotalPages(Math.ceil(data.data.length / ordersPerPage));
            } else {
                setOrders([]);
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setOrders([]);
        });
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filteredOrders = Array.isArray(orders) ? orders.filter(order =>
        Object.values(order).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) : [];

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
                fetchOrders();
            } else {
                setAlert({ message: 'Failed to delete order', type: 'error' });
            }
        })
        .catch(error => {
            console.error('Error deleting order:', error);
            setAlert({ message: 'Error deleting order', type: 'error' });
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
            from_city: order.post?.from_city?.name || 'Unknown',
            to_city: order.post?.to_city?.name || 'Unknown',
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
    
        fetch(`http://127.0.0.1:8000/orders/admin/?order_id=${form.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(form), 
        })
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

    //====== Clear alert after 5 seconds =====
    
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ message: '', type: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="p-4 text-sm">
            {alert.message && (
                <div className={`alert ${alert.type === 'success' ? 'bg-green-200' : 'bg-red-200'} p-2 mb-4 rounded-md`}>
                    {alert.message}
                </div>
            )}
            <div>
                {filteredOrders.length > 0 ? (
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
                                {filteredOrders.map(order => (
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
                                                className="bg-blue-500 text-white px-2 py-1 rounded-md"
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
                                <input
                                    type="text"
                                    name="id"
                                    value={form.id}
                                    readOnly
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    name="client_name"
                                    value={form.client_name}
                                    readOnly
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <input
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
                                />
                                <input
                                    type="datetime-local"
                                    name="pickup_time"
                                    value={form.pickup_time}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                />
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 rounded-md w-full"
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Update Order
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingOrder(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-lg">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this order?</p>
                        <div className="mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
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
