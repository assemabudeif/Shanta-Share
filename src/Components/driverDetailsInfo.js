import React from "react";
import '../CSS/driverProfile.css';

function DriverDetailsInfo(props) {
  return (
    <div className="grid grid-cols-3 gap-20 d-md-grid">
      <div className="detailsInfo mr-20">
        <span className="text-gray font-semibold text-l ml-20 titleInfo">From: <span className="text-gray valueInfo">{props.travelPost.address}</span></span><br />
        <span className="text-gray font-semibold text-l ml-20 titleInfo">Licence Type: <span className="valueInfo">{props.travelPost.licenseType}</span></span>
      </div>
      <div className="col-span-2 flex justify-center">
        <div className="text-end">
          <div className="flex space-x-20 gap-20">
            <div className="text-end">
              <span className="block text-2xl font-bold fontSize">{props.travelPost.totalTrips}</span>
              <span className="text-gray-500 ml-2">Trips</span>
            </div>
            <div>
              <span className="block text-2xl font-bold fontSize">{props.travelPost.driverRating}</span>
              <span className="text-gray-500 ml-0">Rating</span>
            </div>
            <div>
              <span className="block text-2xl font-bold ml-2 fontSize">{props.travelPost.drivingExperience}</span>
              <span className="text-gray-500 ml-0">Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailsInfo;
