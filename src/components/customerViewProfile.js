import React from 'react';
import {StarIcon} from "@heroicons/react/24/solid";
import TravelPost from '../data/travelPost.json';
import DriverInfoComp from './DriverInfoComp';
import DriverDetailsInfo from './driverDetailsInfo.js';
import CarPlateNumberComp from './CarPlateNumberComp.jsx';
import '../CSS/driverProfile.css';

function CustomerViewProfile() {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
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
      {/*Driver Info*/}
       <DriverInfoComp travelPost={TravelPost} hasChat={false}/>
       <DriverDetailsInfo/>
       <div className="flex flex-col lg:flex-row flex-wrap gap-10 mt-10 ml-20">
          <div className="mr-20 w-full lg:w-auto ml-10">
              {/* Plate number */}
              <CarPlateNumberComp travelPost={TravelPost} />
          </div>
          {/* Car images */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {TravelPost.carImages.map((image, index) => (
                  <div key={index} className="bg-[#D9D9D9] w-full lg:w-64 px-10 my-8 lg:my-0 rounded-2xl">
                      <img src={image} width="auto" alt={`car-${index}`} />
                  </div>
              ))}
          </div>
        </div>


        {/* <section className="space-y-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <p className="text-gray-500 mt-2">From: <span className='text-black-500'>{TravelPost.address}</span></p>
            <p className="text-gray-500 mt-1">Licence Type: {TravelPost.licenseType}</p>
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
          <div className="flex justify-around items-center mt-4">
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
          </div>
        </section> */}
    </main>
  );
}

export default CustomerViewProfile;
