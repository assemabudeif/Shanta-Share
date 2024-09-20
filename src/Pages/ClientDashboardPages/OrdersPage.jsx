import {Link, useLocation, useParams} from "react-router-dom";
import Form from "../../Components/Posts/postForm";
import Preview from "../../Components/Posts/preview";
import React, {useEffect, useState} from "react";
import {AxiosInstance} from "../../Network/AxiosInstance";
import order_img from "../../assets/images/order_img.png";
import axios, {Axios} from "axios";

function OrdersPage() {
  const location = useLocation();
  const {id} = useParams();
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
    fetch(`http://127.0.0.1:8000/orders/post-orders/?${queryString}`, config)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPosts(data.data);
        setLoading(false)
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  useEffect(() => {
    AxiosInstance.get(
      `/posts/${id}`
    ).then((response) => setFormData(response.data))
    getPosts()
  }, []);
  useEffect(() => {
    console.log(formData)
  }, [formData]);
  return (
    <>
          <div className="flex space-x-8 p-8">

            <div className="flex-1 flex flex-col">
              <div className="w-full py-4 bg-pink-300">
                <h1 className="mb-2 text-4xl font-semibold ">Post Details</h1>
                <h1 className="text-2xl">Proposals</h1>
              </div>
              <div className="flex ">
                <div className="flex flex-col">
                  {posts.map((post, index) => {
                    return (
                      <div className="my-2">
                        {OrderItem(post)}
                      </div>
                    )
                  })}
                </div>
              </div>
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
            </div>
            <div className="w-1/3 h-fit sticky top-24 right-0 z-100 ">
            <div
                className="p-6 bg-white-50 shadow-md rounded-lg space-y-4 flex flex-col justify-between h-full">
                {/* <h3 className="text-xl font-semibold mb-4">Preview</h3> */}
                <div className='space-y-4'>
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

function OrderItem(post) {
  return (
    <>
      <div className="bg-gray-100 border-2 border-black rounded-2xl grid grid-cols-12 ">

        <img src={'http://localhost:8000' + post.cargo_image} className="col-span-4 h-[100%] rounded-l-2xl object-cover"/>

        <div className="col-span-8 p-4  flex flex-col justify-between">
          <div className={"bg-gray-300 w-full flex flex-col justify-between "}>
            <div className="mb-2">
              <span className={"text-2xl font-semibold"}>
                Pickup

                <span className={"text-xl font-semibold"}>
                      <br/> {post.pickup_address_line}
                </span>
                <span className={"text-xl font-normal"}>
                      <br/> {post.pickup_time}
                </span>
              </span>
            </div>

            <div>
              <span className="text-2xl font-semibold">
                 Destination

                <span className={"text-xl font-semibold"}>
                      <br/> {post.delivery_address_line}
                </span>
                <span className="text-xl font-normal">
                     <br/> {post.arrival_time}
                  </span>
              </span>
            </div>
          </div>

          <div className="bg-pink-200 w-full h-full my-4">
            {post.client_notes}
          </div>


          <div className={"bg-green-200 flex  justify-between"}>
            <div className="w flex items-center">
              <span className="font-bold text-lg">{post.client.name}</span>
              <svg className="w-6 h-6 ms-8" viewBox="0 0 32 32" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_37_379)">
                  <path
                    d="M32 21.3333V32H21.3333C19.4628 31.9981 17.6257 31.5043 16.0062 30.5682C14.3867 29.6321 13.0419 28.2866 12.1067 26.6667C13.1118 26.6595 14.1136 26.5487 15.096 26.336C15.8442 27.2715 16.7933 28.0267 17.8731 28.5456C18.9528 29.0644 20.1354 29.3337 21.3333 29.3333H29.3333V21.3333C29.333 20.135 29.063 18.9521 28.5432 17.8723C28.0234 16.7926 27.2672 15.8437 26.3307 15.096C26.5451 14.1138 26.6577 13.112 26.6667 12.1067C28.2866 13.0419 29.6321 14.3867 30.5682 16.0062C31.5043 17.6257 31.9981 19.4628 32 21.3333ZM24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12L0 24H12C15.1815 23.9965 18.2317 22.7311 20.4814 20.4814C22.7311 18.2317 23.9965 15.1815 24 12ZM2.66667 12C2.66667 10.154 3.21406 8.34954 4.23962 6.81468C5.26518 5.27982 6.72284 4.08354 8.42829 3.37712C10.1337 2.67071 12.0104 2.48588 13.8208 2.846C15.6313 3.20613 17.2944 4.09505 18.5997 5.40034C19.905 6.70563 20.7939 8.36867 21.154 10.1792C21.5141 11.9896 21.3293 13.8663 20.6229 15.5717C19.9165 17.2772 18.7202 18.7348 17.1853 19.7604C15.6505 20.7859 13.846 21.3333 12 21.3333H2.66667V12Z"
                    fill="#374957"/>
                </g>
                <defs>
                  <clipPath id="clip0_37_379">
                    <rect width="32" height="32" fill="white"/>
                  </clipPath>
                </defs>
              </svg>

              <svg className="w-6 h-6 ms-2" viewBox="0 0 41 41" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M33.2101 22.2083C32.8343 22.2083 32.4414 22.0888 32.0655 22.0033C31.3044 21.8356 30.5565 21.613 29.8276 21.3371C29.0351 21.0488 28.1639 21.0637 27.3818 21.3791C26.5997 21.6945 25.9618 22.288 25.5909 23.0454L25.2151 23.8142C23.5512 22.8886 22.0222 21.7389 20.6709 20.3975C19.3295 19.0462 18.1799 17.5173 17.2543 15.8533L17.9718 15.375C18.7292 15.0042 19.3227 14.3663 19.6381 13.5841C19.9535 12.802 19.9684 11.9309 19.6801 11.1383C19.4089 10.4079 19.1863 9.66029 19.0139 8.90042C18.9284 8.52459 18.8601 8.13168 18.8089 7.73876C18.6014 6.53544 17.9711 5.44573 17.0315 4.66588C16.092 3.88602 14.9048 3.46726 13.6839 3.48501H8.55886C7.82262 3.4781 7.09354 3.6299 6.42124 3.93008C5.74894 4.23026 5.14922 4.67178 4.66289 5.22457C4.17656 5.77737 3.81505 6.42846 3.60297 7.13352C3.39088 7.83858 3.33321 8.58107 3.43386 9.31042C4.34396 16.4673 7.61249 23.117 12.7232 28.2091C17.8339 33.3012 24.4954 36.5455 31.6555 37.4296H32.3047C33.5644 37.4314 34.7807 36.9692 35.7214 36.1313C36.2618 35.6479 36.6935 35.0553 36.988 34.3927C37.2825 33.7301 37.4331 33.0126 37.4297 32.2875V27.1625C37.4088 25.9759 36.9767 24.8333 36.2071 23.9298C35.4376 23.0263 34.3783 22.4178 33.2101 22.2083ZM34.0643 32.4583C34.064 32.7009 34.012 32.9406 33.9119 33.1615C33.8117 33.3824 33.6657 33.5795 33.4834 33.7396C33.2931 33.9053 33.07 34.029 32.8286 34.1026C32.5872 34.1762 32.333 34.198 32.0826 34.1667C25.6847 33.3463 19.742 30.4194 15.1918 25.8476C10.6417 21.2758 7.74298 15.3192 6.95303 8.91751C6.92584 8.66727 6.94967 8.41411 7.02307 8.17334C7.09648 7.93257 7.21794 7.70918 7.38011 7.51667C7.5402 7.33445 7.73726 7.1884 7.95817 7.08825C8.17909 6.98811 8.4188 6.93615 8.66136 6.93584H13.7864C14.1836 6.927 14.5716 7.05693 14.8834 7.30325C15.1952 7.54958 15.4113 7.8969 15.4947 8.28542C15.563 8.75237 15.6484 9.21362 15.7509 9.66917C15.9483 10.5697 16.2109 11.4547 16.5368 12.3171L14.1451 13.4275C13.9406 13.5213 13.7567 13.6546 13.6038 13.8197C13.451 13.9848 13.3323 14.1785 13.2545 14.3896C13.1767 14.6007 13.1414 14.8251 13.1506 15.0499C13.1598 15.2747 13.2133 15.4955 13.308 15.6996C15.7667 20.966 20 25.1993 25.2664 27.6579C25.6823 27.8288 26.1488 27.8288 26.5647 27.6579C26.7777 27.5817 26.9735 27.4639 27.1407 27.3114C27.3079 27.159 27.4431 26.9748 27.5384 26.7696L28.5976 24.3779C29.4808 24.6938 30.3821 24.9562 31.2968 25.1638C31.7523 25.2663 32.2136 25.3517 32.6805 25.42C33.0691 25.5034 33.4164 25.7195 33.6627 26.0313C33.909 26.3431 34.0389 26.7311 34.0301 27.1283L34.0643 32.4583Z"
                  fill="#1B1B1B"/>
              </svg>

            </div>
            <div className={"flex  justify-between"}>
              <button className="rounded-full py-2 px-12 bg-black text-white "
              >Accept
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default OrdersPage;