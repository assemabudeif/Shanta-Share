import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
// import Data from '../../data/data.json';
import ReviewCard from './reviewCard';
// import AddReview from './addReview';
import '../../CSS/reviewCard.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { AxiosInstance } from '../../Network/AxiosInstance';

const ReviewsList = ({ driver_id }) => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  // useEffect(() => {
  //   setReviews(Data.reviews);
  // }, []);

  const GetReviews = () => {
    axios.get("http://127.0.0.1:8000/reviews/reviews/", {
      params: {
        driver_id: driver_id
      },
    })
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    GetReviews();
  }, []);


  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4"
      >
        {reviews.map((review, index) => (
          <div key={index} className="flex-shrink-0">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Arrows Container */}
      <div className="absolute right-4 top-[-50px] flex space-x-2 mr-20">
        {/* Left Arrow */}
        <button
          className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
          onClick={handleScrollLeft}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
          onClick={handleScrollRight}
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* <AddReview onSubmit={(newReview) => setReviews([...reviews, newReview])} /> */}
    </div>
  );
};

export default ReviewsList;
