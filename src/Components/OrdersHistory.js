import React, { useEffect, useState } from "react";
import order_img from "../assets/images/order_img.png";
import { AxiosInstance } from "../Network/AxiosInstance";

const ITEMS_PER_PAGE = 5;

export default function OrderHistory() {
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const GetPosts = () => {
    AxiosInstance.get("https://retoolapi.dev/W1fCKB/data")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setPostError(error);
      });
  };

  useEffect(() => {
    GetPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-black" />
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div>
      <div className="main-content" style={{ marginTop: '80px' }}>
        <div className="col-span-3 lg:col-span-2">
          <ul className="grid grid-cols-1 gap-6">
            {paginatedPosts.map((post, index) => (
              <div
                key={index}
                className="border border-black rounded-lg grid grid-cols-1 lg:grid-cols-5 p-2 relative" // Reduced padding
                style={{ fontSize: "0.85rem" }} // Decreased font size
              >
                <div className="w-full lg:col-span-2 px-2 lg:px-2 lg:me-2 lg:my-0 rounded-lg">
                  <img
                    src={order_img}
                    alt="order"
                    className="w-full h-full object-contain max-h-70" // Reduced image size
                  />
                </div>
                <div className="lg:col-span-3 flex flex-col justify-between px-2 lg:px-2 py-2">
                  <div className="flex flex-col lg:flex-row justify-between mb-2">
                    <div>
                      <span className="text-md font-semibold"> {/* Decreased text size */}
                        {post.from}
                        <span className="text-sm font-normal">
                          <br /> Today 06:30 AM
                        </span>
                      </span>
                    </div>
                    <div className="w-16 h-16"> {/* Reduced icon size */}
                      <svg width="30" height="32" viewBox="0 0 50 52" fill="none">
                        <g clipPath="url(#clip0_41_102)">
                          <path
                            d="M46.0847 21.4929L25.5117 0.499984L22.5659 3.51323L43.1388 24.4976C43.5294 24.8961 43.7488 25.4365 43.7488 26C43.7488 26.5635 43.5294 27.1039 43.1388 27.5024L22.5388 48.525L25.4847 51.5297L46.0847 30.5177C47.2563 29.3222 47.9146 27.701 47.9146 26.0106C47.9146 24.3202 47.2563 22.699 46.0847 21.5035V21.4929Z"
                            fill="#374957"
                          />
                          <path
                            d="M28.1972 24.4976L4.7118 0.540357L1.76388 3.54511L23.7785 26L1.74097 48.4782L4.6868 51.4851L28.1972 27.5024C28.5878 27.1039 28.8072 26.5635 28.8072 26C28.8072 25.4365 28.5878 24.8961 28.1972 24.4976Z"
                            fill="#374957"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_41_102">
                            <rect
                              width="50"
                              height="51"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div>
                      <span className="text-md font-semibold"> {/* Decreased text size */}
                        {post.to}
                        <span className="text-sm font-normal">
                          <br /> Today 10:30 AM
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm mt-2"> {/* Decreased text size */}
                      Description here and shipping note or address notes 
                    </h3>

                    <div className="flex flex-col items-end mt-2">
                      <div className="text-md font-semibold mb-1"> {/* Decreased text size */}
                        {post.status}
                      </div>

                      <div className="flex flex-col items-end mb-4">
                        <span className="text-lg font-semibold text-black mb-2 mr-6 mt">
                          In Progress
                        </span>
                        <span className="text-xl font-semibold mt-6 mr-5">
                          {post.price}.00 L.E
                        </span>
                      </div>

                      <button className="bg-black text-white text-md px-10 py-1 rounded-lg mt-6"> {/* Reduced button padding */}
                        Details
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <span className="text-md font-semibold"> {/* Decreased text size */}
                      Driver Name
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ul>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg mx-2"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg mx-2"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
