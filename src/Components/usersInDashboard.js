import React, { useState, useEffect } from 'react';
import '../CSS/users.css'
import { AxiosInstance } from '../Network/AxiosInstance';
import { useSelector } from 'react-redux';
import LoadingComp from './LoadingComp';
import { data } from 'autoprefixer';

function UsersInDashboard() {
    const [drivers, setDrivers] = useState([]);
    const [driverCurrentPage, setDriverCurrentPage] = useState(1);
    const [driversTotalPages, setDriversTotalPages] = useState(1);
    const [clients, setClients] = useState([]);
    const [clientCurrentPage, setClientCurrentPage] = useState(1);
    const [clientsTotalPages, setClientsTotalPages] = useState(1);
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userType, setUserType] = useState('driver');
    const [driverEditUser, setDriverEditUser] = useState(null);
    const [clientEditUser, setClientEditUser] = useState(null);
    const loader = useSelector(state => state.loader.loader);

    const GetDrivers = () => {
        AxiosInstance.get("/users/driver-profile/list", {
            params: {
                page: driverCurrentPage
            }
        })
            .then((response) => {
                console.log("data", response.data.results);

                if (Array.isArray(response.data.results)) {
                    setDrivers(response.data.results);
                    setDriverCurrentPage(response.data.current_page);
                    setDriversTotalPages(response.data.page_count);
                } else {
                    console.error('Response data is not an array:', response.data.results);
                    setDrivers([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    const GetClients = () => {
        AxiosInstance.get("/users/client-profile/list", {
            params: {
                page: clientCurrentPage
            }
        })
            .then((response) => {
                console.log("data", response.data.results);

                if (Array.isArray(response.data.results)) {
                    setClients(response.data.results);
                    setClientCurrentPage(response.data.current_page);
                    setClientsTotalPages(response.data.page_count);
                } else {
                    console.error('Response data is not an array:', response.data.results);
                    setClients([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    useEffect(() => {
        GetDrivers();
        GetClients();
    }, []);

    //    =================================== delete ======================
    const DeleteDriver = (user) => {
        setIsDeleteModalVisible(true);
        setUserToDelete(user);
    }


    const DeleteClient = (user) => {
        setIsDeleteModalVisible(true);
        setUserToDelete(user);
    }

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, visible: false }));
        }, 5000);
    };

    const handleDeleteConfirm = () => {
        console.log("userToDelete", userToDelete)
        AxiosInstance.delete(`/users/${userToDelete.user_type.toLowerCase()}-profile/${userToDelete.id}`)
            .then((response) => {
                console.log("User deleted successfully", response.data.message);
                setIsDeleteModalVisible(false);
                if (userType === 'driver') {
                    GetDrivers();
                } else {
                    GetClients();
                }
                showAlert('User deleted successfully', 'success');
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                showAlert('Error deleting user:' + error.response.data.message, 'error');
                setIsDeleteModalVisible(false);
            });
    };

    //   =================================== Edit ======================

    const EditDriver = () => {
        console.log("driverEditForm", driverEditUser);

        AxiosInstance.patch(`/users/driver-profile/${driverEditUser.id}`, data = {
            name: driverEditUser.name,
            email: driverEditUser.email,
            phone_numbers: driverEditUser.phone_numbers,
            average_rating: driverEditUser.average_rating,
            address_line: driverEditUser.address_line,
        })
            .then((response) => {
                console.log("User updated successfully", response.data.data);
                showAlert('User updated successfully', 'success');
                GetDrivers();
                setDriverEditUser(null);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                showAlert('Error updated user', 'error');
            });
    };


    const EditClient = () => {
        console.log("clientEditForm", clientEditUser);

        AxiosInstance.patch(`/users/client-profile/${clientEditUser.id}`, data = {
            name: clientEditUser.name,
            email: clientEditUser.email,
            phone_numbers: clientEditUser.phone_numbers,
            address_line: clientEditUser.address_line,
        })
            .then((response) => {
                console.log("User updated successfully", response.data.data);
                showAlert('User updated successfully', 'success');
                GetClients();
                setClientEditUser(null);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                showAlert('Error updated user', 'error');
            });
    };

    const driversPaginate = (pageNumber) => setDriverCurrentPage(pageNumber);
    const clientsPaginate = (pageNumber) => setClientCurrentPage(pageNumber);

    useEffect(() => {
        GetDrivers();
    }, [driverCurrentPage]);

    useEffect(() => {
        GetClients();
    }, [clientCurrentPage]);

    const extractPhoneNumber = (phoneStr) => {
        const match = phoneStr.match(/'phone_number':\s*'(\d+)'/);
        return match ? match[1] : phoneStr;
    };

    if (loader) {
        return (
            <LoadingComp />
        )
    }


    return (
        <>
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
            </div>
            <div className="p-4 text-sm">
                <div>
                    <button className={`px-4 py-2 ${userType === 'driver' ? 'bg-black' : 'bg-gray-300'} text-white rounded-md`} onClick={() => setUserType('driver')} >
                        Drivers
                    </button>
                    <button className={`px-4 py-2 ${userType === 'client' ? 'bg-black' : 'bg-gray-300'} text-white rounded-md ml-4`} onClick={() => setUserType('client')}>
                        Clients
                    </button>
                </div>
                <br />
                <br />

                <div>
                    {
                        userType === 'driver' ? (
                            <>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Government</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">City</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Address Line</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Rating</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {drivers.map(user => (
                                            <tr key={user.id} className='cursor-pointer'>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.phone_numbers.map(phone => extractPhoneNumber(phone.phone_number)).join(', ')}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.city_ids[0].government.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.city_ids[0].name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.address_line}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{user.average_rating}</td>

                                                <td className="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                                                    <button className="text-white px-2 py-1 rounded-md bg-yellow-500" onClick={() => setDriverEditUser(user)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => DeleteDriver(user)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => driversPaginate(driverCurrentPage - 1)}
                                        disabled={driverCurrentPage === 1}
                                        className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                                    >
                                        Prev
                                    </button>
                                    {[...Array(driversTotalPages).keys()].map(pageNumber => (
                                        <button
                                            key={pageNumber + 1}
                                            onClick={() => driversPaginate(pageNumber + 1)}
                                            className={`py-1 px-3 mx-1 ${driverCurrentPage === pageNumber + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => driversPaginate(driverCurrentPage + 1)}
                                        disabled={driverCurrentPage === driversTotalPages}
                                        className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                                    >
                                        Next
                                    </button>
                                </div>

                                <br />
                                <br />

                                {
                                    driverEditUser && (
                                        <>
                                            <h3 className="text-2xl font-bold mb-4">
                                                Edit Driver
                                            </h3>
                                            <form>
                                                <label className="block text-gray-700 mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={driverEditUser.name}
                                                    placeholder='Enter Name'
                                                    onChange={(e) => setDriverEditUser({ ...driverEditUser, name: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />

                                                <label className="block text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={driverEditUser.email}
                                                    placeholder='Enter Email'
                                                    onChange={(e) => setDriverEditUser({ ...driverEditUser, email: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />

                                                <label className="block text-gray-700 mb-2">Mobile</label>
                                                <input
                                                    type="text"
                                                    value={driverEditUser.phone_numbers[0].phone_number}
                                                    placeholder='Enter Mobile'
                                                    onChange={(e) => setDriverEditUser({ ...driverEditUser, phone_numbers: [{ phone_number: e.target.value }] })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />


                                                <label className="block text-gray-700 mb-2">Address Line</label>
                                                <input
                                                    type="text"
                                                    value={driverEditUser.address_line}
                                                    placeholder='Enter Address Line'
                                                    onChange={(e) => setDriverEditUser({ ...driverEditUser, address: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />

                                                <label className="block text-gray-700 mb-2">Rating</label>
                                                <input
                                                    type="number"
                                                    value={driverEditUser.average_rating}
                                                    placeholder='Enter Rating'
                                                    onChange={(e) => setDriverEditUser({ ...driverEditUser, average_rating: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-8"
                                                />

                                                <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 me-2 rounded" onClick={EditDriver}>Save</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setDriverEditUser(null)}>Cancel</button>

                                            </form>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Government</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">City</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Address Line</th>
                                            <th className="border-b px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {clients.map(user => (
                                            <tr key={user.id} className='cursor-pointer'>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.name}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.email}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.phone_numbers.map(phone => extractPhoneNumber(phone.phone_number)).join(', ')}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.city_ids[0].government.name}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.city_ids[0].name}</td>
                                                <td className="px-4 py-2 text-lg text-gray-800">{user.address_line}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                                                    <button className="text-white px-2 py-1 rounded-md bg-yellow-500" onClick={() => setClientEditUser(user)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => DeleteClient(user)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => clientsPaginate(clientCurrentPage - 1)}
                                        disabled={clientCurrentPage === 1}
                                        className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                                    >
                                        Prev
                                    </button>
                                    {[...Array(clientsTotalPages).keys()].map(pageNumber => (
                                        <button
                                            key={pageNumber + 1}
                                            onClick={() => clientsPaginate(pageNumber + 1)}
                                            className={`py-1 px-3 mx-1 ${clientCurrentPage === pageNumber + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => clientsPaginate(clientCurrentPage + 1)}
                                        disabled={clientCurrentPage === clientsTotalPages}
                                        className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
                                    >
                                        Next
                                    </button>
                                </div>
                                <br />
                                <br />

                                {
                                    clientEditUser && (
                                        <>
                                            <h3 className="text-2xl font-bold mb-4">
                                                Edit Client
                                            </h3>
                                            <form>
                                                <label className="block text-gray-700 mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={clientEditUser.name}
                                                    placeholder='Enter Name'
                                                    onChange={(e) => setClientEditUser({ ...clientEditUser, name: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />

                                                <label className="block text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={clientEditUser.email}
                                                    placeholder='Enter Email'
                                                    onChange={(e) => setClientEditUser({ ...clientEditUser, email: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />

                                                <label className="block text-gray-700 mb-2">Mobile</label>
                                                <input
                                                    type="text"
                                                    value={clientEditUser.phone_numbers[0].phone_number}
                                                    placeholder='Enter Mobile'
                                                    onChange={(e) => setClientEditUser({ ...clientEditUser, phone_numbers: [{ phone_number: e.target.value }] })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />


                                                <label className="block text-gray-700 mb-2">Address Line</label>
                                                <input
                                                    type="text"
                                                    value={clientEditUser.address_line}
                                                    placeholder='Enter Address Line'
                                                    onChange={(e) => setClientEditUser({ ...clientEditUser, address: e.target.value })}
                                                    className="border rounded-lg py-2 px-4 w-full mb-4"
                                                />


                                                <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 me-2 rounded" onClick={EditClient}>Save</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setClientEditUser(null)}>Cancel</button>

                                            </form>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>

                {/* Modal for deleting */}
                {isDeleteModalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-1/3">
                            <h2 className="text-2xl mb-4 mb-10"><center><strong>Confirm Deletion</strong></center></h2>
                            <p className="mb-4 text-xl">Are you sure you want to delete user {userToDelete?.name}?</p>
                            <div className="flex justify-between items-center space-x-2 mt-10">
                                <button onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded-lg">Confirm</button>
                                <button onClick={() => setIsDeleteModalVisible(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}


            </div >
        </>
    );
}


export default UsersInDashboard;
