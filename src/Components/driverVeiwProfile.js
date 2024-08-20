import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TravelPost from '../data/travelPost.json';
import '../CSS/driverProfile.css';

const DriverViewProfile = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(TravelPost);
  const [imagePreview, setImagePreview] = useState(TravelPost.driverImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedDriver(prevState => ({ ...prevState, driverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedDriver);
    setIsEditing(false);
  };

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <header className="flex flex-col md:flex-row items-center mb-6 driver-profile-header">
        {isEditing ? (
          <>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="mb-4"
            />
            <img 
              src={imagePreview} 
              alt={`${editedDriver.driverName}'s profile`} 
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 md:mb-0 md:mr-4" 
            />
            <input 
              type="text" 
              name="fullName" 
              value={editedDriver.driverName} 
              onChange={handleChange} 
              className="text-2xl font-bold border-b border-gray-300"
            />
          </>
        ) : (
          <img 
            src={editedDriver.driverName} 
            alt={`${editedDriver.driverName}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 md:mb-0 md:mr-4"
          />
        )}
        {!isEditing && <h1 className="text-2xl font-bold">{editedDriver.driverName}</h1>}
      </header>
      <section className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <table className="w-full text-left border-0 driver-profile-table">
              <tbody>
                <tr>
                  <td className="font-bold py-2 w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Experience:</label>
                  </td>
                  <td className="py-2">
                    <input 
                      type="number" 
                      name="drivingExperience" 
                      value={editedDriver.drivingExperience} 
                      onChange={handleChange} 
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-bold py-2 w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Contact:</label>
                  </td>
                  <td className="py-2">
                    <input 
                      type="text" 
                      name="phoneNumber" 
                      value={editedDriver.driverPhone} 
                      onChange={handleChange} 
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm mb-2"
                    />
                    <input 
                      type="text" 
                      name="email" 
                      value={editedDriver.email} 
                      onChange={handleChange} 
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <p className="py-2 text-center rating">{renderStars(editedDriver.driverRating)}</p>
            <table className="w-full text-left border-0 driver-profile-table">
              <thead>
                <tr className="border-b text-center">
                  {/* Optional: Add table headings here if needed */}
                </tr>
              </thead>
              <tbody>
                <tr className="border-0">
                  <td className="font-bold py-2">Phone Number</td>
                  <td className="py-2">{editedDriver.driverPhone}</td>
                  <td className="font-bold py-2">Email</td>
                  <td className="py-2">{editedDriver.email}</td>
                </tr>
                <tr className="border-0">
                  <td className="font-bold py-2">Total Trips:</td>
                  <td className="py-2">{editedDriver.totalTrips} Trip</td>
                  <td className="font-bold py-2">Experience:</td>
                  <td className="py-2">{editedDriver.drivingExperience} years</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Join Date:</td>
                  <td className="py-2">{editedDriver.joinDate}</td>
                  <td className="font-bold py-2">Vehicle:</td>
                  <td className="py-2">{editedDriver.vehicleType}</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">License Number:</td>
                  <td className="py-2">{editedDriver.licenseImage}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </section>
      <div className="flex justify-end space-x-4 driver-profile-button">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

DriverViewProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default DriverViewProfile;
