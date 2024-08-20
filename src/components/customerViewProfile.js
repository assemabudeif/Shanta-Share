import React from 'react';
import driverData from '../data/driverData.json';
import '../CSS/driverProfile.css';

function CustomerViewProfile() {
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-500"/>);
    }

    if (halfStar) {
        stars.push(<StarIcon key="half" className="w-5 h-5 text-yellow-500 opacity-50"/>);
    }
    return stars;
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        <header className="flex flex-col md:flex-row items-center mb-6">
          <img 
            src={driverData.profilePicture} 
            alt={`${driverData.fullName}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 md:mb-0 md:mr-4"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold">{driverData.fullName}</h1>
            <p className="flex items-center mt-2">
              {renderStars(Math.floor(driverData.averageRating))}
              <span className="ml-2 text-gray-500">{driverData.averageRating} verified</span>
            </p>
          </div>
          <div className="ml-auto mt-2">
            <a href={`tel:${driverData.phoneNumber}`} className="text-blue-500 text-2xl">
              📞
            </a>
          </div>
        </header>
        <section className="space-y-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <p className="text-gray-500 mt-2">From: <span className='text-black-500'>{driverData.address}</span></p>
            <p className="text-gray-500 mt-1">Licence Type: {driverData.licenseType}</p>
            <div>
              <span className="block text-xl font-bold">{driverData.totalTrips}</span>
              <span className="text-gray-500">Trips</span>
            </div>
            <div>
              <span className="block text-xl font-bold">{driverData.averageRating}</span>
              <span className="text-gray-500">Rating</span>
            </div>
            <div>
              <span className="block text-xl font-bold">{driverData.drivingExperience}</span>
              <span className="text-gray-500">Years</span>
            </div>
          </div>
          {/* <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <span className="block font-bold text-lg">Toyota</span>
              <span className="text-gray-500">Hilux</span>
              <span className="text-gray-500">2010</span>
            </div>
            <div className="rounded-lg p-4">
            <table className="w-full text-lg font-bold border-collapse tableLinces">
              <thead>
                <tr>
                  <td className="bg-red-500 border border-black h-12"></td>
                  <td className="bg-red-500 border border-black h-12"></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black text-center">1 2 3 4</td>
                  <td className="border border-black text-center">ن د ر</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div> */}
        </section>
      </div>
    </main>
  );
}

export default CustomerViewProfile;
