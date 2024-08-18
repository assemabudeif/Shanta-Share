import React, { useState } from 'react';
import DriverData from '../../data/driverData.json'

const AddReview = ({ onSubmit }, review) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && text) {
      onSubmit({ reviewerName:review.reviewerName, date: new Date().toISOString().split('T')[0], rating, text });
      setRating(0);  // Reset after submission
      setText('');
      setIsOpen(false);  // Close modal after submission
    } 
    // else {
    //   alert("Please provide a rating and a review text");
    // }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);  // Set rating to the index of the star clicked
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                <div className="flex">
                  {Array(5).fill(0).map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className={`cursor-pointer text-3xl ${
                        index < rating ? 'text-yellow-500' : 'text-gray-300'
                      } mr-2`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review:</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReview;
