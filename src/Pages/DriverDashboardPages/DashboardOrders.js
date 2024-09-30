import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  FaCaretDown,
  FaClock,
  FaDollarSign,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaTruck,
  FaWeightHanging,
} from 'react-icons/fa';
import LoadingProgress from "../../Components/LoadingProgress";



function DashBoardOrders() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    // {
    //   "id": 22,
    //   "post": {
    //     "id": 35,
    //     "description": "qwertyujnbvcx",
    //     // "from_city": {
    //     //   "id": 1,
    //     //   "government": {
    //     //     "id": 1,
    //     //     "name": "Al-Minia"
    //     //   },
    //     //   "name": "Maghagha",
    //     //   "latitude": 28.65312,
    //     //   "longitude": 30.83489
    //     // },
    //     "from_address_line": "12 Al-Adle st",
    //     "pickup_time": "2024-09-21T01:08:00Z",
    //     "to_city": {
    //       "id": 3,
    //       "government": {
    //         "id": 1,
    //         "name": "Al-Minia"
    //       },
    //       "name": "Matai",
    //       "latitude": 28.41708,
    //       "longitude": 30.78339
    //     },
    //     "to_address_line": "Al Salam",
    //     "arrival_time": "2024-09-21T01:08:00Z",
    //     "max_weight": 1,
    //     "max_size": 2,
    //     "created_by": {
    //       "id": 77,
    //       "city_ids": [
    //         {
    //           "id": 1,
    //           "government": {
    //             "id": 1,
    //             "name": "Al-Minia"
    //           },
    //           "name": "Maghagha",
    //           "latitude": 28.65312,
    //           "longitude": 30.83489
    //         }
    //       ],
    //       "phone_numbers": [
    //         {
    //           "id": 11,
    //           "phone_number": "0123456789"
    //         }
    //       ],
    //       "car_ids": [
    //         {
    //           "id": 5,
    //           "make": "Toyota",
    //           "model": "hi-lux",
    //           "year": 2020
    //         }
    //       ],
    //       "driver_license_ids": [
    //         {
    //           "id": 26,
    //           "front_image_url": "/media/Car_license_images/3aeee31f-e3a3-4bbb-8a2c-230c8e9bb7e5.png",
    //           "back_image_url": "/media/Car_license_images/825a4603-191d-4bdc-883e-4dcab90a2efb.png",
    //           "license_number": "01234567890123",
    //           "issued_date": "2020-02-22",
    //           "expiration_date": "2027-02-22"
    //         }
    //       ],
    //       "nationality_id": {
    //         "id": 32,
    //         "front_image_url": "/media/Nationality_id_images/fac117a1-918e-4eeb-a3f8-6f4265a84bba.png",
    //         "back_image_url": "/media/Nationality_id_images/d8920e09-5b41-4f0a-9497-8b73d1500e93.png",
    //         "nationality_id_number": "12345678901234",
    //         "issued_date": "2020-02-20",
    //         "expiration_date": "2027-02-20"
    //       },
    //       "user": {
    //         "id": 77,
    //         "password": "pbkdf2_sha256$870000$LbvFqsnjD0UVfPxclJF4HO$7IaYBIYAABuwIrzu7azaHoQ0y9FrelZCUVMaV36btCY=",
    //         "last_login": "2024-09-21T00:41:36.039356Z",
    //         "is_superuser": false,
    //         "username": "amr125@gmail.com",
    //         "first_name": "",
    //         "last_name": "",
    //         "email": "amr125@gmail.com",
    //         "is_staff": false,
    //         "is_active": true,
    //         "date_joined": "2024-09-20T13:01:17.617623Z",
    //         "user_type": "DRIVER",
    //         "created_at": "2024-09-20T13:01:20.054333Z",
    //         "updated_at": "2024-09-20T21:41:36.040197Z",
    //         "admin": false,
    //         "groups": [],
    //         "user_permissions": []
    //       },
    //       "profile_picture": "/media/profile_pictures/16576713-0311-4b72-aec3-99701e3451e9.png",
    //       "password": "pbkdf2_sha256$870000$LbvFqsnjD0UVfPxclJF4HO$7IaYBIYAABuwIrzu7azaHoQ0y9FrelZCUVMaV36btCY=",
    //       "last_login": "2024-09-21T00:41:36.039356Z",
    //       "is_superuser": false,
    //       "username": "amr125@gmail.com",
    //       "first_name": "",
    //       "last_name": "",
    //       "email": "amr125@gmail.com",
    //       "is_staff": false,
    //       "is_active": true,
    //       "date_joined": "2024-09-20T13:01:17.617623Z",
    //       "user_type": "DRIVER",
    //       "created_at": "2024-09-20T13:01:20.054333Z",
    //       "updated_at": "2024-09-20T21:41:36.040197Z",
    //       "admin": false,
    //       "name": "Amr Ghietah",
    //       "address_line": "12 Al-Adle st",
    //       "birth_date": "1998-02-21",
    //       "average_rating": "0.00",
    //       "groups": [],
    //       "user_permissions": []
    //     },
    //     "delivery_fee": 125.2944,
    //     "delivery_commission": 11.3904
    //   },
    //   "client": {
    //     "id": 75,
    //     "city_ids": [
    //       {
    //         "id": 1,
    //         "government": {
    //           "id": 1,
    //           "name": "Al-Minia"
    //         },
    //         "name": "Maghagha",
    //         "latitude": 28.65312,
    //         "longitude": 30.83489
    //       }
    //     ],
    //     "phone_numbers": [
    //       {
    //         "id": 1,
    //         "phone_number": "01234567890"
    //       }
    //     ],
    //     "profile_picture": "/media/profile_pictures/cf93f856-affc-4bfa-912a-402859ec5fa0.png",
    //     "password": "pbkdf2_sha256$870000$YzLMefAgoh4865B3iPVSgi$/zKlTDkPfp7ddLhXMx3H8C6qCrnrn5qpA7yUzIAch3Q=",
    //     "last_login": "2024-09-21T00:40:53.525719Z",
    //     "is_superuser": false,
    //     "username": "amr123@gmail.com",
    //     "first_name": "",
    //     "last_name": "",
    //     "email": "amr123@gmail.com",
    //     "is_staff": false,
    //     "is_active": true,
    //     "date_joined": "2024-09-20T11:41:26.027064Z",
    //     "user_type": "CLIENT",
    //     "created_at": "2024-09-20T11:41:28.721774Z",
    //     "updated_at": "2024-09-20T21:40:53.525719Z",
    //     "admin": false,
    //     "name": "Amr Ghietah",
    //     "address_line": "12 Al-Adel st",
    //     "birth_date": "1998-02-21",
    //     "groups": [],
    //     "user_permissions": []
    //   },
    //   "created_at": "2024-09-21T02:02:03.273924Z",
    //   "status": "pending",
    //   "payment_status": "unpaid",
    //   "pickup_time": "2024-09-21T00:02:00Z",
    //   // "pickup_address_line": "1234567 sdfghjhgfrew",
    //   "arrival_time": "2022-02-21T02:12:00Z",
    //   "delivery_address_line": null,
    //   "client_notes": "zxcvbhnj",
    //   "cargo_image": "/media/cargo_images/79ed4c6c-5ebb-45e3-99eb-0ccf443dcc0d.png"
    // },
    // {
    //   "id": 21,
    //   "post": {
    //     "id": 35,
    //     "description": "qwertyujnbvcx",
    //     "from_city": {
    //       "id": 1,
    //       "government": {
    //         "id": 1,
    //         "name": "Al-Minia"
    //       },
    //       "name": "Maghagha",
    //       "latitude": 28.65312,
    //       "longitude": 30.83489
    //     },
    //     "from_address_line": "12 Al-Adle st",
    //     "pickup_time": "2024-09-21T01:08:00Z",
    //     "to_city": {
    //       "id": 3,
    //       "government": {
    //         "id": 1,
    //         "name": "Al-Minia"
    //       },
    //       "name": "Matai",
    //       "latitude": 28.41708,
    //       "longitude": 30.78339
    //     },
    //     "to_address_line": "Al Salam",
    //     "arrival_time": "2024-09-21T01:08:00Z",
    //     "max_weight": 1,
    //     "max_size": 2,
    //     "created_by": {
    //       "id": 77,
    //       "city_ids": [
    //         {
    //           "id": 1,
    //           "government": {
    //             "id": 1,
    //             "name": "Al-Minia"
    //           },
    //           "name": "Maghagha",
    //           "latitude": 28.65312,
    //           "longitude": 30.83489
    //         }
    //       ],
    //       "phone_numbers": [
    //         {
    //           "id": 11,
    //           "phone_number": "0123456789"
    //         }
    //       ],
    //       "car_ids": [
    //         {
    //           "id": 5,
    //           "make": "Toyota",
    //           "model": "hi-lux",
    //           "year": 2020
    //         }
    //       ],
    //       "driver_license_ids": [
    //         {
    //           "id": 26,
    //           "front_image_url": "/media/Car_license_images/3aeee31f-e3a3-4bbb-8a2c-230c8e9bb7e5.png",
    //           "back_image_url": "/media/Car_license_images/825a4603-191d-4bdc-883e-4dcab90a2efb.png",
    //           "license_number": "01234567890123",
    //           "issued_date": "2020-02-22",
    //           "expiration_date": "2027-02-22"
    //         }
    //       ],
    //       "nationality_id": {
    //         "id": 32,
    //         "front_image_url": "/media/Nationality_id_images/fac117a1-918e-4eeb-a3f8-6f4265a84bba.png",
    //         "back_image_url": "/media/Nationality_id_images/d8920e09-5b41-4f0a-9497-8b73d1500e93.png",
    //         "nationality_id_number": "12345678901234",
    //         "issued_date": "2020-02-20",
    //         "expiration_date": "2027-02-20"
    //       },
    //       "user": {
    //         "id": 77,
    //         "password": "pbkdf2_sha256$870000$LbvFqsnjD0UVfPxclJF4HO$7IaYBIYAABuwIrzu7azaHoQ0y9FrelZCUVMaV36btCY=",
    //         "last_login": "2024-09-21T00:41:36.039356Z",
    //         "is_superuser": false,
    //         "username": "amr125@gmail.com",
    //         "first_name": "",
    //         "last_name": "",
    //         "email": "amr125@gmail.com",
    //         "is_staff": false,
    //         "is_active": true,
    //         "date_joined": "2024-09-20T13:01:17.617623Z",
    //         "user_type": "DRIVER",
    //         "created_at": "2024-09-20T13:01:20.054333Z",
    //         "updated_at": "2024-09-20T21:41:36.040197Z",
    //         "admin": false,
    //         "groups": [],
    //         "user_permissions": []
    //       },
    //       "profile_picture": "/media/profile_pictures/16576713-0311-4b72-aec3-99701e3451e9.png",
    //       "password": "pbkdf2_sha256$870000$LbvFqsnjD0UVfPxclJF4HO$7IaYBIYAABuwIrzu7azaHoQ0y9FrelZCUVMaV36btCY=",
    //       "last_login": "2024-09-21T00:41:36.039356Z",
    //       "is_superuser": false,
    //       "username": "amr125@gmail.com",
    //       "first_name": "",
    //       "last_name": "",
    //       "email": "amr125@gmail.com",
    //       "is_staff": false,
    //       "is_active": true,
    //       "date_joined": "2024-09-20T13:01:17.617623Z",
    //       "user_type": "DRIVER",
    //       "created_at": "2024-09-20T13:01:20.054333Z",
    //       "updated_at": "2024-09-20T21:41:36.040197Z",
    //       "admin": false,
    //       "name": "Amr Ghietah",
    //       "address_line": "12 Al-Adle st",
    //       "birth_date": "1998-02-21",
    //       "average_rating": "0.00",
    //       "groups": [],
    //       "user_permissions": []
    //     },
    //     "delivery_fee": 125.2944,
    //     "delivery_commission": 11.3904
    //   },
    //   "client": {
    //     "id": 75,
    //     "city_ids": [
    //       {
    //         "id": 1,
    //         "government": {
    //           "id": 1,
    //           "name": "Al-Minia"
    //         },
    //         "name": "Maghagha",
    //         "latitude": 28.65312,
    //         "longitude": 30.83489
    //       }
    //     ],
    //     "phone_numbers": [
    //       {
    //         "id": 1,
    //         "phone_number": "01234567890"
    //       }
    //     ],
    //     "profile_picture": "/media/profile_pictures/cf93f856-affc-4bfa-912a-402859ec5fa0.png",
    //     "password": "pbkdf2_sha256$870000$YzLMefAgoh4865B3iPVSgi$/zKlTDkPfp7ddLhXMx3H8C6qCrnrn5qpA7yUzIAch3Q=",
    //     "last_login": "2024-09-21T00:40:53.525719Z",
    //     "is_superuser": false,
    //     "username": "amr123@gmail.com",
    //     "first_name": "",
    //     "last_name": "",
    //     "email": "amr123@gmail.com",
    //     "is_staff": false,
    //     "is_active": true,
    //     "date_joined": "2024-09-20T11:41:26.027064Z",
    //     "user_type": "CLIENT",
    //     "created_at": "2024-09-20T11:41:28.721774Z",
    //     "updated_at": "2024-09-20T21:40:53.525719Z",
    //     "admin": false,
    //     "name": "Amr Ghietah",
    //     "address_line": "12 Al-Adel st",
    //     "birth_date": "1998-02-21",
    //     "groups": [],
    //     "user_permissions": []
    //   },
    //   "created_at": "2024-09-21T14:54:44.477185Z",
    //   "status": "in_progress",
    //   "payment_status": "unpaid",
    //   "pickup_time": "2024-09-21T00:02:00Z",
    //   "pickup_address_line": "pictdvs sdv",
    //   "arrival_time": "2022-02-21T02:12:00Z",
    //   "delivery_address_line": null,
    //   "client_notes": "zxcvbhnj",
    //   "cargo_image": "/media/cargo_images/a00fcd03-0b13-4317-8918-161a1d22704f.png"
    // }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'canceled':
        return 'bg-gray-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };



  useEffect(() => {
    const params = {
      page: currentPage,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
    const queryString = new URLSearchParams(params).toString();
      fetch(`http://127.0.0.1:8000/orders/driver-orders/`, config)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setPosts(data.results);
              // setTotalPages(Math.ceil(data.count / postsPerPage));
          })
          .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // setCurrentPage(1)
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // const filteredPosts = posts.filter(post =>
  //     Object.values(post).some(value =>
  //         value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  // );

  const handelCompleteAction = (id) => {

    // setAcceptLoading(true);

    const params = {
      order_id:id,
      order_status: 'completed',
    }
    const config = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
    const queryString = new URLSearchParams(params).toString();
    fetch(`http://127.0.0.1:8000/orders/update-status/?${queryString}`, config)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // setAcceptLoading(false);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 text-sm">

      <div>
        {posts.length > 0 ? (
          <>
            {/*<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">*/}
            {/*  <thead className="bg-gray-100">*/}
            {/*  <tr>*/}
            {/*    /!*<th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>*!/*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">From*/}
            {/*    </th>*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">To*/}
            {/*    </th>*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name*/}
            {/*    </th>*/}
            {/*    /!*<th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rate</th>*!/*/}
            {/*    /!*<th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>*!/*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Weight*/}
            {/*    </th>*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price*/}
            {/*    </th>*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pick*/}
            {/*      Time*/}
            {/*    </th>*/}
            {/*    <th*/}
            {/*      className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Arrival*/}
            {/*      Time*/}
            {/*    </th>*/}
            {/*  </tr>*/}
            {/*  </thead>*/}
            {/*  <tbody className="divide-y divide-gray-200">*/}
            {/*  {posts.map(post => (*/}
            {/*    <tr key={post.id}*/}
            {/*        className='cursor-pointer'*/}
            {/*        onClick={() => navigate(`/OrdersHistory`)}*/}
            {/*    >*/}
            {/*      /!*<td className="px-4 py-2 text-sm text-gray-800">{post.id}</td>*!/*/}
            {/*      <td*/}
            {/*        className="px-4 py-2 text-sm text-gray-800">{post.pickup_address_line ?? post.post.from_city?.name ?? "UnKnown"}</td>*/}
            {/*      <td*/}
            {/*        className="px-4 py-2 text-sm text-gray-800">{post.delivery_address_line ?? post.post.to_city?.name ?? "UnKnown"}</td>*/}
            {/*      <td className="px-4 py-2 text-sm text-gray-800">{post.client?.name ?? "Unknown"}</td>*/}
            {/*      <td className="px-4 py-2 text-sm text-gray-800">{post.post.max_weight} kg</td>*/}
            {/*      <td className="px-4 py-2 text-sm text-gray-800">${post.post.delivery_fee}</td>*/}
            {/*      <td className="px-4 py-2 text-sm text-gray-800">{post.pickup_time}</td>*/}
            {/*      <td className="px-4 py-2 text-sm text-gray-800">{post.arrival_time}</td>*/}
            {/*    </tr>*/}
            {/*  ))}*/}

            {/*  </tbody>*/}
            {/*</table>*/}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={post.id} className="border border-gray-200 rounded-lg shadow-md">
                  {/* Accordion Header */}
                  <div
                    className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center transition-colors duration-300 ease-in-out hover:bg-gray-200 rounded-t-lg"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="text-lg font-semibold text-gray-800 flex items-center space-x-3">
                      <FaTruck className="text-blue-600"/>
                      <span>{post.client?.name ?? "Unknown"}</span>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`px-2 py-1 text-s font-semibold text-white rounded-full ${getStatusColor(post.status)}`}>
                      {post.status.toUpperCase()}
                    </div>

                    <div
                      className={`transform transition-transform duration-300 ease-in-out  ${openAccordionIndex === index ? 'rotate-180' : 'rotate-0'}`}>

                      <FaCaretDown />
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                      openAccordionIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {openAccordionIndex === index && (
                      <div className="bg-white p-4 transition-opacity duration-500 ease-in-out space-y-4">
                        {/* Delivery Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col justify-center items-start space-y-2">
                            <div className="flex items-center space-x-2">
                              <FaMapMarkerAlt className="text-green-500"/>
                              <p>
                                <strong>From: </strong> {post.post.from_city?.name ?? "UnKnown"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaInfoCircle className="text-yellow-400"/>
                              <p>
                                <strong></strong> {post.pickup_address_line ?? post.post.from_city?.name ?? "UnKnown"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaClock className="text-blue-500"/>
                              <p><strong>Pick Time:</strong> {post.pickup_time}</p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-start space-y-2">
                            <div className="flex items-center space-x-2">
                              <FaMapMarkerAlt className="text-red-500"/>
                              <p>
                                <strong>To:</strong> {post.delivery_address_line ?? post.post.to_city?.name ?? "UnKnown"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaInfoCircle className="text-yellow-400"/>
                              <p>
                                <strong></strong> {post.delivery_address_line ?? post.post.to_city?.name ?? "UnKnown"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 sm:col-span-3">
                              <FaClock className="text-red-500"/>
                              <p><strong>Arrival Time:</strong> {post.arrival_time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-300"/>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <FaWeightHanging className="text-yellow-500"/>
                            <p><strong>Weight:</strong> {post.post.max_weight} kg</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaDollarSign className="text-green-600"/>
                            <p><strong>Price:</strong> ${post.post.delivery_fee}</p>
                          </div>

                        </div>


                        {/* Divider */}
                        <hr className="border-gray-300"/>

                        <div className="w-full flex items-end justify-end">
                          {
                            post.status === "in_progress" &&
                            <button
                              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
                              onClick={() => {
                                handelCompleteAction(post.id)
                              }}
                            >
                              Complete
                            </button>
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

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
          <LoadingProgress/>

          // <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default DashBoardOrders;
