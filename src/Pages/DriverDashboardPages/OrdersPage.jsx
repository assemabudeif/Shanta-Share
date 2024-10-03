import {Link, useLocation, useParams} from "react-router-dom";
import Form from "../../Components/Posts/postForm";
import Preview from "../../Components/Posts/preview";
import React, {useEffect, useState} from "react";
import {AxiosInstance} from "../../Network/AxiosInstance";
import order_img from "../../assets/images/order_img.png";
import axios, {Axios} from "axios";
import LoadingProgress from "../../Components/LoadingProgress";
import CircularProgress from "../../Components/LoadingProgressCircular";
import OrderItem from "../../Components/OrderItem";

function OrdersPage() {
  const location = useLocation();
  const {id} = useParams();
  const [loadingItemIndex ,setUsingItemIndes] = useState({
    index: 0,
    isloading: false,
  })
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 5;
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


  const [formData, setFormData] = useState({
    from_government: {},
    from_city: {},
    from_address_line: '',
    to_government: {},
    to_city: {},
    to_address_line: '',
    pickup_time: '',
    arrival_time: '',
    max_weight: '-- Kg',
    max_size: '-- msq',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPosts = () => {

    const params = {
      post_id:id
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
    const queryString = new URLSearchParams(params).toString();
    setLoading(true);
    fetch(`http://127.0.0.1:8000/orders/post-orders/?${queryString}`, config)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const posts = data.data.filter((post) => post.status === 'pending');
        console.log(posts);
        setPosts(posts);
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        console.error('Error fetching posts:', error);
      });
  }

  useEffect(() => {
    setDetailsLoading(true);
    AxiosInstance.get(
      `/posts/${id}`
    )
      .then((response) => {

        setFormData(response.data);
        setDetailsLoading(false);
      })
      .catch((e) =>{
        console.error('Error fetching posts:', e);
        setDetailsLoading(false);
      })
    getPosts()
  }, []);
  useEffect(() => {
    console.log(formData)
  }, [formData]);
  const handelOrderAccept = (data) => {
    getPosts();
  }
  const handelOrderReject = (data) => {
    getPosts();
  }
  return (
    <>
          <div className="flex space-x-8 p-8">
            <div className="flex-1 flex flex-col">
              <div className="w-full py-4 ">
                <h1 className="mb-2 text-4xl font-semibold ">Post Details</h1>
                <h1 className="text-2xl">Proposals</h1>
              </div>
              <div className="flex ">
                <div className="flex flex-col w-full">
                  {loading
                    ? <LoadingProgress/>
                    : (posts?.length > 0)
                      ? posts.map((post, index) => {
                        return (
                          <div className="my-2" key={post.id}>
                            <OrderItem
                              post={post}
                              acceptCallback={handelOrderAccept}
                              rejectCallback={handelOrderReject}
                            />
                          </div>
                        )
                      })
                      : <div> No Proposals yet.. Please wait for clients proposals </div>
                  }
                </div>
              </div>
              {
                (totalPages > 1)
                  ? <div className="mt-4 flex justify-center">
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
                  : <></>
              }
            </div>
            <div className="w-1/3 h-fit sticky top-24 right-0 z-100 ">
              <div
                className="p-6 bg-white-50 shadow-md rounded-lg space-y-4 flex flex-col justify-between h-full">
                {/* <h3 className="text-xl font-semibold mb-4">Preview</h3> */}
                {
                  detailsLoading
                    ? <div className='h-96 flex justify-center items-center w-full'>
                      <CircularProgress size={12}/>
                    </div>
                    : <div className='space-y-4'>
                      <div className="space-y-2">
                        <strong className="block">Pickup</strong>
                        <p
                          className='color-text'>{formData.from_address_line || 'Address line'}, {formData.from_city?.name || 'City'}, {formData.from_city.government?.name || 'Government'}</p>
                        <p className='color-text'>{formData.pickup_time || 'DD/MM/YYYY - HH:MM'}</p>
                      </div>
                      <div className="space-y-2">
                        <strong className="block">Destination</strong>
                        <p
                          className='color-text'>{formData.to_address_line || 'Address line'}, {formData.to_city?.name || 'City'}, {formData.to_city.government?.name || 'Government'}</p>

                        <p className='color-text'>{formData.arrival_time || 'DD/MM/YYYY - HH:MM'}</p>
                      </div>
                      <div className="space-y-2">
                        <strong className="block">Available weight and size</strong>
                        <div className='flex items-center space-x-20'>
                          <p className='color-text input-with-icon-weight2'>{formData.max_weight || '10.0 kg'}</p>
                          <p className='color-text input-with-icon-area2'>{formData.max_size || '2.0 msq'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <strong className="block">Description</strong>
                        <p className='color-text'>{formData.description || 'Write notes for clients...'}</p>
                      </div>
                    </div>
                }
                <div className="mt-auto space-y-4">
                  <hr/>
                  <div className="flex items-center space-x-2 justify-between">

                    <strong className="block text-lg fee">Price</strong>
                    <strong className="block text-lg fee">{formData.delivery_fee?.toFixed(2) ?? '--'} L.E</strong>

                    {/* <button className="w-full py-2 px-4 bg-black text-white rounded">Calculate Price</button> */}
                  </div>

                  {/*<button className="w-full py-2 px-4 bg-gray-400 text-white rounded" onClick={onSubmit}>Confirm Post*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

export default OrdersPage;