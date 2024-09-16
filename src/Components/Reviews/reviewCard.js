import React from 'react';
import '../../CSS/reviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200 max-w-4xl mx-auto reviewCard">
      {/* الصورة، الاسم والتاريخ في نفس السطر */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {/* صورة الشخص على اليسار */}
          <img 
            src={review.reviewerPicture} 
            alt={`${review.client}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
          />
          {/* الاسم بجانب الصورة */}
          <span className="text-lg font-semibold text-gray-800">{review.client}</span>
        </div>
        {/* تاريخ المراجعة على اليمين */}
        <span className="text-sm text-gray-500">{review.review_date}</span>
      </div>
      
      {/* التقييم والتعليق تحت الاسم */}
      <div className="ml-28"> {/* Adjusted margin-left to align under the name */}
        <div className="flex mb-2">
          {Array(review.rating).fill().map((_, i) => (
            <span key={i} className="text-yellow-500 text-lg">⭐</span>
          ))}
        </div>
        <p className="text-gray-700 text-sm sm:text-base">{review.review_text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
