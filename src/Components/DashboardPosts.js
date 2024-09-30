import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../Network/AxiosInstance';
import LoadingComp from './LoadingComp';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';
function DashBoardPosts() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const loader = useSelector(state => state.loader.loader);
    const [loading, setLoading] = useState(false);


    const FetchPosts = () => {
        console.log("Current Page: ", currentPage);

        setLoading(true);

        AxiosInstance.get('/posts/', {
            params: {
                page: currentPage
            },
        })
            .then(response => {
                const data = response.data;
                setPosts(data.results);
                setTotalPages(data.page_count);
                setCurrentPage(data.current_page);
            })
            .catch(error => console.error('Error fetching data:', error)).finally(() => setLoading(false));
    };

    //====== Search & paginatation =====

    useEffect(() => {
        FetchPosts();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filteredPosts = posts.filter(post =>
        Object.values(post).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    //====== Clear alert after 3 seconds =====


    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    const handleDeleteConfirmation = (postId) => {
        setPostIdToDelete(postId);
        setIsModalOpen(true);
    };


    // ========== Handling Delete ==========


    const handleDelete = () => {
        const token = localStorage.getItem("token");

        fetch(`http://127.0.0.1:8000/posts/details/${postIdToDelete}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    showAlert('Post deleted successfully', 'success');
                } else {
                    showAlert('Failed to delete post', 'error');
                }
            })
            .catch(error => console.error('Error deleting post:', error))
            .finally(() => {
                setIsModalOpen(false);
                setPostIdToDelete(null);
            });
    };



    // ========== Handling Edit =================

    const handleEdit = (post) => {
        setEditingPost(post);
        setForm({
            id: post.id,
            description: post.description,
            from_address_line: post.from_address_line,
            pickup_time: post.pickup_time,
            to_address_line: post.to_address_line,
            arrival_time: post.arrival_time,
            max_weight: post.max_weight,
            max_size: post.max_size,
            delivery_fee: post.delivery_fee,
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
        AxiosInstance.patch(`/posts/details/${form.id}`, data = {
            description: form.description,
            from_address_line: form.from_address_line,
            pickup_time: form.pickup_time,
            to_address_line: form.to_address_line,
            arrival_time: form.arrival_time,
            max_weight: form.max_weight,
            max_size: form.max_size,
            delivery_fee: form.delivery_fee,
        })
            .then(response => {
                if (!response.ok) {
                    showAlert('Post updated successfully', 'success');
                    FetchPosts();
                    setEditingPost(null);
                }
            })
            .catch(error => {
                showAlert(error.message, 'error');
                console.error('Error updating post:', error);
            });
    };


    useEffect(() => {
        FetchPosts();
    }, []);

    if (loader || loading) {
        return (<LoadingComp />)
    }


    return (
        <div className="p-4 text-sm">
            {alert.visible && (
                <div className={`p-4 mb-4 text-sm text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`} role="alert">
                    {alert.message}
                    <button
                        className="ml-4 text-white hover:text-gray-200"
                        onClick={() => setAlert({ ...alert, visible: false })}
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Search Input */}
            {/* <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search posts"
                    className="border p-2 rounded-md w-full"
                />
            </div> */}

            <div>
                {filteredPosts.length > 0 ? (
                    <>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    {/* <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th> */}
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">From</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">To</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rate</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Delivery Fee</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Weight</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pick Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Arrival Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPosts.map(post => (
                                    <tr key={post.id} className='cursor-pointer'>
                                        {/* <td className="px-4 py-2 text-sm text-gray-800">{post.id}</td> */}
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.from_city ? post.from_city.name : 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.to_city ? post.to_city.name : 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.average_rating}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{Math.round(post.delivery_fee)} EGP</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.max_weight} kg</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.description}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{new Date(post.pickup_time).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{new Date(post.arrival_time).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="text-white px-2 py-1 rounded-md bg-yellow-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirmation(post.id)}
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
                        {editingPost && (
                            <form onSubmit={handleFormSubmit} className="mt-4 bg-gray-100 p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Edit Post</h2>

                                {/* 
                                "description": "asdfghj sdfghj sdfghj asdfghv",
                                "from_address_line": "12 Al-Adle st",
                                "pickup_time": "2024-09-24T22:23:00Z",
                                "to_address_line": "Al Salam",
                                "arrival_time": "2024-09-24T22:23:00Z",
                                "max_weight": 1.0,
                                "max_size": 1.0,
                                "delivery_fee": 158.4528,
                                */}
                                <div className="mb-4">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="from_address_line" className="block mb-2 text-sm font-medium text-gray-700">From Address</label>
                                    <input
                                        type="text"
                                        id="from_address_line"
                                        name="from_address_line"
                                        value={form.from_address_line}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="pickup_time" className="block mb-2 text-sm font-medium text-gray-700">Pickup Time</label>
                                    <input
                                        type="datetime-local"
                                        id="pickup_time"
                                        name="pickup_time"
                                        value={form.pickup_time}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="to_address_line" className="block mb-2 text-sm font-medium text-gray-700">To Address</label>
                                    <input
                                        type="text"
                                        id="to_address_line"
                                        name="to_address_line"
                                        value={form.to_address_line}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="arrival_time" className="block mb-2 text-sm font-medium text-gray-700">Arrival Time</label>
                                    <input
                                        type="datetime-local"
                                        id="arrival_time"
                                        name="arrival_time"
                                        value={form.arrival_time}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="max_weight" className="block mb-2 text-sm font-medium text-gray-700">Max Weight</label>
                                    <input
                                        type="number"
                                        id="max_weight"
                                        name="max_weight"
                                        value={form.max_weight}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="max_size" className="block mb-2 text-sm font-medium text-gray-700">Max Size</label>
                                    <input
                                        type="number"
                                        id="max_size"
                                        name="max_size"
                                        value={form.max_size}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="delivery_fee" className="block mb-2 text-sm font-medium text-gray-700">Delivery Fee</label>
                                    <input
                                        type="number"
                                        id="delivery_fee"
                                        name="delivery_fee"
                                        value={form.delivery_fee}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded-md">Update Post</button>
                                <button type="button" onClick={() => setEditingPost(null)}
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
                    <p>No posts found.</p>
                )}
            </div>

            {/* Deletion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl mb-4 mb-10">
                            <center><strong>Confirm Deletion</strong></center>
                        </h2>
                        <p className="mb-4 text-xl">Are you sure you want to delete this post?</p>
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

export default DashBoardPosts;
