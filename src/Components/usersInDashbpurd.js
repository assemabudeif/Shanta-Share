import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/users.css'

function UsersInDashbourd() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [extraUsers, setExtraUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [form, setForm] = useState({
        id: '',
        name:'',
        first_name: '',
        last_name: '',
        email: '',
        phone_numbers: '',
        average_rating: '',
        user_type: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const usersPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:8000/users/driver-profile/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log("data", response.data.data);

            if (Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error('Response data is not an array:', response.data);
                setUsers([]);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

        axios.get("http://localhost:8000/users/client-profile/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log("data", response.data.data);

            if (Array.isArray(response.data.data)) {
                setExtraUsers(response.data.data);
            } else {
                console.error('Response data is not an array:', response.data);
                setExtraUsers([]);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    
    }, []);
    
   
    const mergedUsers = [...users, ...extraUsers];

    
    const handleEdit = (user) => {
        setIsModalVisible(true);
        setEditingUser(user);
        setForm({
            id: user.id,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone_numbers: user.phone_numbers.map(phone => phone.phone_number).join(', ') || '',
            average_rating: user.average_rating || '',
            user_type: user.user_type || ''
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

        axios.patch(`http://localhost:8000/users/${form.user_type.toLowerCase()}-profile/${form.id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log("User updated successfully", response.data);
            
            setIsModalVisible(false);
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    };
//    =================================== delete===============
    const handleDeleteClick = (user) => {
        setIsDeleteModalVisible(true);
        setUserToDelete(user);
    };
    const handleDeleteConfirm = () => {
        const token = localStorage.getItem("token");
    
        axios.delete(`http://localhost:8000/users/${userToDelete.user_type.toLowerCase()}-profile/${userToDelete.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log("User deleted successfully", response.data);
            
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setExtraUsers(extraUsers.filter(user => user.id !== userToDelete.id));
            setIsDeleteModalVisible(false);
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    };
    
    

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = Array.isArray(mergedUsers) 
        ? mergedUsers
            .filter(user =>
                Object.values(user).some(value => 
                    value !== null && value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            .slice(indexOfFirstUser, indexOfLastUser)
        : [];

    const totalPages = Math.ceil(mergedUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const extractPhoneNumber = (phoneStr) => {
        const match = phoneStr.match(/'phone_number':\s*'(\d+)'/);
        return match ? match[1] : phoneStr;
    };

    return (
        <div className="p-4 text-sm">
            {/* search*/}
            <div className={`flex justify-center mb-4 bg-gray-200 p-4 rounded-lg ${isFormVisible ? 'hidden' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=" py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-lg search"
                />
            </div>

            {!isFormVisible && (
                <div>
                    {currentUsers.length > 0 ? (
                        <>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">ID</th>
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                                        {form.user_type=='DRIVER'&&(<th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Rating</th>)}
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">User type</th>
                                        <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentUsers.map(user => (
                                        <tr key={user.id} className='cursor-pointer'>
                                            <td className="px-4 py-2 text-lg text-gray-800">{user.id}</td>
                                            <td className="px-4 py-2 text-lg text-gray-800">{user.name}</td>
                                            <td className="px-4 py-2 text-lg text-gray-800">{user.email}</td>
                                            <td className="px-4 py-2 text-lg text-gray-800">{user.phone_numbers.map(phone => extractPhoneNumber(phone.phone_number)).join(', ')}</td>
                                            {form.user_type == 'DRIVER'&&(<td className="px-4 py-2 text-lg text-gray-800">{user.average_rating}</td>)}
                                            <td className="px-4 py-2 text-lg text-gray-800">{user.user_type}</td>
                                            <td className="px-4 py-2 text-lg text-gray-800">
                                                <button className="py-2 px-4 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 text-lg" onClick={() => handleEdit(user)}>Edit</button>
                                                <button className="py-2 px-4 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 text-lg" onClick={() => handleDeleteClick(user)}>Delete</button>
                                            </td>
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
                        <p className="text-gray-500">No Users available.</p>
                    )}
                </div>
            )}

            {/* Modal for Editing */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-3xl mb-4 items-center"><center><strong>Edit User</strong></center></h2>
                        <form onSubmit={handleFormSubmit}>
                           <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleFormChange}
                                placeholder="Name"
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleFormChange}
                                placeholder="First Name"
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleFormChange}
                                placeholder="Last Name"
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleFormChange}
                                placeholder="Email"
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="phone_numbers"
                                value={form.phone_numbers}
                                onChange={handleFormChange}
                                placeholder="Phone Numbers"
                                className="border p-2 w-full mb-2"
                            />
                            {form.user_type =='DRIVER' &&(<input
                                type="text"
                                name="average_rating"
                                value={form.average_rating}
                                onChange={handleFormChange}
                                placeholder="Average Rating"
                                className="border p-2 w-full mb-2"
                            />)}
                            <div className="flex justify-between items-center space-x-2">
                                <button type="submit" className="bg-gray-500 text-white py-2 px-4 rounded-lg">Save</button>
                                <button type="button" className="bg-black text-white py-2 px-4 rounded-lg" onClick={() => setIsModalVisible(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal for deleting */}
            {isDeleteModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl mb-4 mb-10"><center><strong>Confirm Deletion</strong></center></h2>
                        <p className="mb-4 text-xl">Are you sure you want to delete user {userToDelete?.name}?</p>
                        <div className="flex justify-between items-center space-x-2 mt-10">
                            <button onClick={handleDeleteConfirm} className="bg-black text-white py-2 px-4 rounded-lg">Confirm</button>
                            <button onClick={() => setIsDeleteModalVisible(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default UsersInDashbourd;
