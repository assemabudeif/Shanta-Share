import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoardOrders() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  
    const [searchTerm, setSearchTerm] = useState('');
    const postsPerPage = 5;

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/posts/?page=${currentPage}&page_size=${postsPerPage}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setPosts(data.results);
                setTotalPages(Math.ceil(data.count / postsPerPage)); 
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [currentPage]);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filteredPosts = posts.filter(post =>
        Object.values(post).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 text-sm">
           
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPosts.map(post => (
                                    <tr key={post.id}
                                        className='cursor-pointer'
                                        onClick={() => navigate(`/OrdersHistory`)}
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
        </div>
    );
}

export default DashBoardOrders;
