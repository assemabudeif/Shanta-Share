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



function DashBoardOrders() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
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
      fetch(`http://127.0.0.1:8000/orders/client-orders/`, config)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setPosts(data.data);
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
    fetch(`http://127.0.0.1:8000/orders/client/?${queryString}`, config)
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
                                <strong>From: </strong> {post.post.to_city?.name ?? "UnKnown"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaInfoCircle className="text-yellow-400"/>
                              <p>
                                <strong></strong> {post.pickup_address_line ?? post.post.to_city?.name ?? "UnKnown"}
                              </p>
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
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-500"/>
                            <p><strong>Pick Time:</strong> {post.pickup_time}</p>
                          </div>
                          <div className="flex items-center space-x-2 sm:col-span-3">
                            <FaClock className="text-red-500"/>
                            <p><strong>Arrival Time:</strong> {post.arrival_time}</p>
                          </div>
                        </div>


                        {/* Divider */}
                        <hr className="border-gray-300"/>

                        <div className="flex items-end">
                          <button
                            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
                            onClick={()=>{
                              handelCompleteAction(post.id)
                            }}
                          >
                            Cancel
                          </button>
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
          <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
          </div>

          // <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default DashBoardOrders;
