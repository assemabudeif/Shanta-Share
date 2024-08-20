import React from "react";
import TravelPost from '../data/travelPost.json';
import '../CSS/driverProfile.css'

function DriverDetailsInfo(){

   return(
      <div className="flex grid grid-cols-3 gap-20 ">
        <div className="detailsInfo mr-20">
            <span className="text-gray font-semibold text-l ml-20 titleInfo">From: <span className="text-gray valueInfo">{TravelPost.address}</span></span><br></br>
            <span className="text-gray font-semibold text-l ml-20 titleInfo">Licence Type: <span className="valueInfo">{TravelPost.licenseType}</span></span>
        </div>
        <div className="flex space-x-20 gap-20">
            <div>
              <span className="block text-2xl font-bold fontSize">{TravelPost.totalTrips}</span>
              <span className="text-gray-500 ml-2">Trips</span>
            </div>
            <div>
              <span className="block text-2xl font-bold fontSize">{TravelPost.driverRating}</span>
              <span className="text-gray-500 ml-0">Rating</span>
            </div>
            <div>
              <span className="block text-2xl font-bold ml-2 fontSize">{TravelPost.drivingExperience}</span>
              <span className="text-gray-500 ml-0">Years</span>
            </div>
          </div>
        </div>
   );
} export default DriverDetailsInfo