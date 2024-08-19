import React from 'react';
// import PropTypes from 'prop-types';
import driverData from '../data/driverData.json';
import '../CSS/driverProfile.css';

function CustomerViewProfile() {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        <header className="flex flex-col md:flex-row items-center mb-6 driver-profile-header">
          <img 
            src={driverData.profilePicture} 
            alt={`${driverData.fullName}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 md:mb-0 md:mr-4"
          />
          <h1 className="text-2xl font-bold text-center md:text-left">{driverData.fullName}</h1>
        </header>
        <section className="space-y-4 mb-6">
          <p className="py-2 text-center rating">{renderStars(driverData.averageRating)}</p>
          <div className="overflow-x-auto">
            <table className="w-full md:w-1/2 sm:w-1/8  text-left border-collapse table-auto driver-profile-table">
              <thead className="text-center">
                <tr>
                  {/* Optionally add table headings here if needed */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold py-2">Phone Number</td>
                  <td className="py-2">{driverData.phoneNumber}</td>
                  <td className="font-bold py-2">Email</td>
                  <td className="py-2">{driverData.email}</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Total Trips:</td>
                  <td className="py-2">{driverData.totalTrips} Trip</td>
                  <td className="font-bold py-2">Experience:</td>
                  <td className="py-2">{driverData.drivingExperience} years</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Join Date:</td>
                  <td className="py-2">{driverData.joinDate}</td>
                  <td className="font-bold py-2">Vehicle:</td>
                  <td className="py-2">{driverData.vehicleType}</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">License Number:</td>
                  <td className="py-2">{driverData.licensePlate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CustomerViewProfile;
