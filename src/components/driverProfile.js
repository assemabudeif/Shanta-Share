import React, { useState } from 'react';
import PropTypes from 'prop-types';
import driverData from '../data/driverData.json';
import '../CSS/driverProfile.css'

const DriverProfile = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(driverData);
  const [imagePreview, setImagePreview] = useState(driverData.profilePicture);

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
        setEditedDriver(prevState => ({ ...prevState, profilePicture: reader.result }));
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid">
      <header className="flex items-center mb-6 driver-profile-header">
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
              alt={`${editedDriver.fullName}'s profile`} 
              className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4" 
            />
            <input 
              type="text" 
              name="fullName" 
              value={editedDriver.fullName} 
              onChange={handleChange} 
              className="text-2xl font-bold border-b border-gray-300 mb-2"
            />
          </>
        ) : (
          <img 
            src={editedDriver.profilePicture} 
            alt={`${editedDriver.fullName}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
          />
        )}
        {!isEditing && <h1 className="text-2xl font-bold">{editedDriver.fullName}</h1>}
      </header>
      <section className="space-y-4 mb-6 ">
        {isEditing ? (
          <>
            <div className="col-span-2">
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
                  value={editedDriver.phoneNumber} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
          </>
        ) : (
        <>
          <p className="py-2 text-center rating">{renderStars(editedDriver.averageRating)}</p>
          <table className="w-full text-left border-0 m-10 mt-5 pt-5 driver-profile-table">
            <thead text-center> 
              <tr className="border-b text-center">
              </tr>
            </thead>
            <tbody>
              <tr className="border-0">
                <td className="font-bold py-2">Phone Namber</td>
                <td className="py-2">{editedDriver.phoneNumber}</td>
                <td className="font-bold py-2">Email</td>
                <td className="py-2">{editedDriver.email}</td>
              </tr>
              <tr className="border-0">
                <td className="font-bold py-2">Total Trips:</td>
                <td className="py-2">{editedDriver.totalTrips} Trip</td>
                <td className="font-bold py-2">Experience:</td>
                <td className="py-2">{editedDriver.drivingExperience} years</td>
              </tr>
              <tr className>
                <td className="font-bold py-2">Join Date:</td>
                <td className="py-2">{editedDriver.joinDate}</td>
                <td className="font-bold py-2">Vehicle:</td>
                <td className="py-2">{editedDriver.vehicleType}</td>
              </tr>
              <tr className>
                <td className="font-bold py-2">License Number:</td>
                <td className="py-2">{editedDriver.licensePlate}</td>
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
              className="px-4 py-2 bg-blue-500 text-white rounded-md driver-profile-button-save"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md iver-profile-button-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="px-4 py-2 bg-green-500 text-white rounded-md driver-profile-button-edit"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

DriverProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default DriverProfile;
