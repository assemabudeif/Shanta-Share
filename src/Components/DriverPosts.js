import React, { useState, useEffect } from 'react';
import CreatePostPage from './Posts/createPostPage';
import {useNavigate, useNavigation} from "react-router-dom";

function DriverPosts() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [form, setForm] = useState({
        id: '',
        from: '',
        to: '',
        name: '',
        rate: '',
        price: '',
        weight: '',
        description: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const postsPerPage = 5;

    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/posts/')
            .then(response => response.json())
            .then(data => {
            console.log(data.results)
                setPosts(data.results);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setPosts(prevPosts => {
            const newPost = { ...form, id: prevPosts.length + 1 };
            return [...prevPosts, newPost];
        });
        setIsFormVisible(false);
        setForm({
            id: '',
            from: '',
            to: '',
            name: '',
            rate: '',
            price: '',
            max_weight: '',
            description: ''
        });
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts
        .filter(post =>
            Object.values(post).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 text-sm">
            <div className="flex items-center justify-between mb-4">
                {/* <h2 className="text-2xl font-semibold">My Posts</h2> */}
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="py-2 px-4 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 text-lg"
                >
                    {isFormVisible ? 'Cancel' : 'Create Post'}
                </button>
            </div>

            {/* Search Input */}
            <div className={`flex justify-end mb-4 bg-gray-200 p-4 rounded-lg ${isFormVisible ? 'hidden' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=" py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-sm"
                />
            </div>

            {isFormVisible && (
                <CreatePostPage/>
                // <form onSubmit={handleFormSubmit} className="mb-4">
                //     <input type="text" name="from" value={form.from} onChange={handleFormChange} placeholder="From" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <input type="text" name="to" value={form.to} onChange={handleFormChange} placeholder="To" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder="Name" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <input type="text" name="rate" value={form.rate} onChange={handleFormChange} placeholder="Rate" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <input type="number" name="price" value={form.price} onChange={handleFormChange} placeholder="Price" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <input type="number" name="weight" value={form.weight} onChange={handleFormChange} placeholder="Weight" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" required className="border px-2 py-1 rounded-md mb-2 w-full" />
                //     <button type="submit" className="py-2 px-4 bg-black text-white rounded-lg">Submit</button>
                // </form>
            )}

            {!isFormVisible && (
                <div>
                    {currentPosts.length > 0 ? (
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

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentPosts.map(post => (
                                        <tr key={post.id}
                                            className='cursor-pointer'
                                            onClick={()=> navigate('/client-dashboard', {state: {postId: post.id}})}
                                        >
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.id}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.from_city ? post.from_city.name : 'Unknown'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.to_city ? post.to_city.name : 'Unknown'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.average_rate}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">${post.price}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.max_weight} kg</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.description}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{post.pickup_time}</td>
 
</tr>
                                    ))}
                                </tbody>
                            </table>

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
                        <p className="text-gray-500">No posts available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DriverPosts;
