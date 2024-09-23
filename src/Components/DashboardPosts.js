import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../Network/AxiosInstance';
import LoadingComp from './LoadingComp';
function DashBoardPosts() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const postsPerPage = 5;
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [loading, setLoading] = useState(true); 

    // useEffect(() => {
    //     fetchPosts();
    // }, [currentPage]);

    // const fetchPosts = () => {
    //     fetch(`http://127.0.0.1:8000/posts/`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setPosts(data.results);
    //             setTotalPages(Math.ceil(data.count / postsPerPage));
    //         })
    //         .catch(error => console.error('Error fetching posts:', error));
    // };

    const fetchPosts = () => {
        setLoading(true); 
        AxiosInstance.get('http://127.0.0.1:8000/posts/')
            .then(response => {
                const data = response.data;
                setPosts(data.results);
                setTotalPages(Math.ceil(data.count / postsPerPage));
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                setLoading(false); 
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []); // 
    if (loading) {
        return <LoadingComp />; 
    }

    

    //====== Search & paginatation =====

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filteredPosts = posts.filter(post =>
        Object.values(post).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    //====== Clear alert after 5 seconds =====


    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, visible: false }));
        }, 5000);
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
            from_city: post.from_city?.name || '',
            to_city: post.to_city?.name || '',
            created_by: post.created_by.name,
            average_rate: post.created_by.average_rate,
            price: post.price,
            max_weight: post.max_weight,
            description: post.description,
            pickup_time: post.pickup_time,
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
        const token = localStorage.getItem("token");

        fetch(`http://127.0.0.1:8000/posts/details/${form.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                from_city: form.from_city,
                to_city: form.to_city,
                price: form.price,
                max_weight: form.max_weight,
                description: form.description,
                pickup_time: form.pickup_time,
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.detail || 'Failed to update post');
                });
            }
            showAlert('Post updated successfully', 'success');
            fetchPosts();
            setEditingPost(null);
        })
        .catch(error => {
            showAlert(error.message, 'error');
            console.error('Error updating post:', error);
        });
    };

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
            <div className="mb-4">
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search posts"
                    className="border p-2 rounded-md w-full"
                />
            </div>

            <div>
                {filteredPosts.length > 0 ? (
                    <>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">From</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">To</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rate</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Weight</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pick Time</th>
                                    <th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPosts.map(post => (
                                    <tr key={post.id} className='cursor-pointer'>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.from_city ? post.from_city.name : 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.to_city ? post.to_city.name : 'Unknown'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.average_rate}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">${post.price}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.max_weight} kg</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.description}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800">{post.pickup_time}</td>
                                        <td className="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="bg-black text-white px-2 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirmation(post.id)}
                                                className="bg-black text-white px-2 py-1 rounded-md"
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
                                <input
                                    type="text"
                                    name="from_city"
                                    value={form.from_city}
                                    onChange={handleFormChange}
                                    placeholder="From City"
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <input
                                    type="text"
                                    name="to_city"
                                    value={form.to_city}
                                    onChange={handleFormChange}
                                    placeholder="To City"
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleFormChange}
                                    placeholder="Price"
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <input
                                    type="number"
                                    name="max_weight"
                                    value={form.max_weight}
                                    onChange={handleFormChange}
                                    placeholder="Max Weight"
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleFormChange}
                                    placeholder="Description"
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <input
                                    type="datetime-local"
                                    name="pickup_time"
                                    value={form.pickup_time}
                                    onChange={handleFormChange}
                                    className="border p-2 mb-2 w-full rounded-md"
                                />
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Update Post</button>
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

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashBoardPosts;
