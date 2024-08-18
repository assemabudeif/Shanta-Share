import React from 'react';
import '../../CSS/reviewCard.css'

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200 max-w-4xl mx-auto reviewCard">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-2">
        <span className="text-lg font-semibold text-gray-800">{review.reviewerName}</span>
        <span className="text-sm text-gray-500 mt-1 sm:mt-0">{review.date}</span>
      </div>
      <div className="flex mb-2">
        {Array(review.rating).fill().map((_, i) => (
          <span key={i} className="text-yellow-500 text-lg">⭐</span>
        ))}
      </div>
      <div>
        <p className="text-gray-700 text-sm sm:text-base">{review.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
