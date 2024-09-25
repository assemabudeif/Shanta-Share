import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CreatePostPage from "../../Components/Posts/createPostPage";
import LoadingProgress from "../../Components/LoadingProgress";
import CircularProgress from "../../Components/LoadingProgressCircular";

function PostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
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
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    // //TODO: Data loading
    // setIsPostsLoading(true);
    // const params = {
    //   page: currentPage,
    // }
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // }
    // const queryString = new URLSearchParams(params).toString();
    // fetch(`http://127.0.0.1:8000/posts/driver-posts/?${queryString}`, config)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setPosts(data.results);
    //     setPageCount(data.page_count);
    //     setIsPostsLoading(false);
    //   })
    //   .catch(error => console.error('Error fetching posts:', error));
    fetchPosts();
  }, []);

  useEffect(() => {
    // const params = {
    //   page: currentPage,
    // }
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // }
    // const queryString = new URLSearchParams(params).toString();
    // fetch(`http://127.0.0.1:8000/posts/driver-posts/?${queryString}`, config)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setPosts(data.results);
    //     setPageCount(data.page_count)
    //   })
    //   .catch(error => console.error('Error fetching posts:', error));

    fetchPosts();
  }, [currentPage]);

  const fetchPosts = () => {
    setIsPostsLoading(true);
    const params = {
      page: currentPage,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
    const queryString = new URLSearchParams(params).toString();
    fetch(`http://127.0.0.1:8000/posts/driver-posts/?${queryString}`, config)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPosts(data.results);
        setPageCount(data.page_count);
        setIsPostsLoading(false);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

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
  // const indexOfLastPost = currentPage * 5;
  // const indexOfFirstPost = indexOfLastPost - 5;
  // const currentPosts = posts
  //   .filter(post =>
  //     Object.values(post).some(value =>
  //       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   )
  //   .slice(indexOfFirstPost, indexOfLastPost);
  // const totalPages = Math.ceil(posts.length / 5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 text-sm">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-2xl font-semibold">My Posts</h2> */}
        <button
          // onClick={() => setIsFormVisible(!isFormVisible)}
          onClick={()=>{navigate('create')}}
          className="py-2 px-4 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 text-lg"
        >
         Create Post

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


      <div>
        {!isPostsLoading ? (
          <>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
              <tr>
                {/*<th className="border-b px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>*/}
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
              {posts.map(post => (
                <tr key={post.id}
                    className='cursor-pointer'
                    onClick={()=> navigate(`${post.id}`, {state: {postId: post.id}})}
                >
                  {/*<td className="px-4 py-2 text-sm text-gray-800">{post.id}</td>*/}
                  <td className="px-4 py-2 text-sm text-gray-800">{post.from_city ? post.from_city.name : 'Unknown'}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{post.to_city ? post.to_city.name : 'Unknown'}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{post.created_by.average_rate}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">${post.delivery_fee}</td>
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
              {[...Array(pageCount).keys()].map(pageNumber => (
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
                disabled={currentPage === pageCount}
                className="py-1 px-3 mx-1 bg-gray-200 text-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <LoadingProgress/>
          </div>
        )}
      </div>

    </div>
  );
}
export default PostsPage;