import React, { useState, useEffect } from 'react';
import DriverData from '../../data/driverData.json';
import ReviewCard from './reviewCard';
import AddReview from './addReview';

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
    <div className="p-4">
      {reviews.slice(0, showMore ? reviews.length : 1).map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
      {reviews.length > 1 && (
        <button
          onClick={handleShowMore}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 btnShow"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
      <AddReview onSubmit={handleAddReview} />
    </div>
  );
};

export default ReviewsList;
