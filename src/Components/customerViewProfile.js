import React from 'react';
import {StarIcon} from "@heroicons/react/24/solid";
import Data from '../data/data.json';
import DriverInfoComp from './DriverInfoComp';
import DriverDetailsInfo from '../Components/driverDetailsInfo.js';
import CarPlateNumberComp from './CarPlateNumberComp.jsx';
import '../CSS/driverProfile.css';

function CustomerViewProfile({ driverData, carData} ) {
  
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
       <DriverInfoComp travelPost={driverData} hasChat={false}/>
       <DriverDetailsInfo travelPost={driverData}/>
       <div className="flex flex-col lg:flex-row flex-wrap gap-20 mt-10 ml-20">
          <div className="mr-20 w-full lg:w-auto ml-10">
              {/* Plate number */}
              <CarPlateNumberComp carData={carData} />
          </div>
          {/* Car images */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto col-span-2 flex justify-center">
              {Data.carImages.map((image, index) => (
                  <div key={index} className="bg-[#D9D9D9] w-full lg:w-64 px-10 my-8 lg:my-0 rounded-2xl">
                      <img src={image} width="auto" alt={`car-${index}`} />
                  </div>
              ))}
          </div>
        </div>


    </main>
  );
}

export default CustomerViewProfile;
