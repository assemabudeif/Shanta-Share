import React, { useState, useEffect } from 'react';
import DriverData from '../../data/driverData.json';
import ReviewCard from './reviewCard';
import AddReview from './addReview';
import '../../CSS/reviewCard.css'

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setReviews(DriverData.reviews); 
  }, []);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]); 
  };

  const handleShowMore = () => {
    setShowMore(!showMore); 
  };

  return (
    <div className="p-4 flex flex-col">
      {reviews.slice(0, showMore ? reviews.length : 1).map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
      <div className="mt-2 ml-20">
        {reviews.length > 1 && (
          <button
            onClick={handleShowMore}
            className=" ml-70 mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 btnShow"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
        <AddReview onSubmit={handleAddReview} />
      </div>
    </div>
  );
};

export default ReviewsList;
