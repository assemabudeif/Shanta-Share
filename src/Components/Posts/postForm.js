import React, { useState } from 'react';
import '../../CSS/createPost.css';
// import weightImage from "../assets/images/weight.png";
import weightImage from "../../assets/images/weight.png";
import areaImage from "../../assets/images/area.png";


function Form({ onFormChange }) {
  const [formData, setFormData] = useState({
    from: '',
    pickupCity: '',
    pickupTime: '',
    to: '',
    destinationCity: '',
    arrivalTime: '',
    weight: '10.0 Kg',
    size: '2.0 msq',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name} is required`;
    } else if ((name === 'from' || name === 'to') && value.length < 2) {
      error = `${name} must be at least 2 characters long`;
    } else if ((name === 'weight' || name === 'size') && isNaN(value)) {
      error = `${name} must be a number`;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate the input
    const error = validate(name, value);
    
    // Update form data and errors
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: error
    });
    
    onFormChange({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="p-6 rounded-lg space-y-4">
        <h1 className="text-2xl font-semibold mb-10 titlePost">Create Post</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium titleLocation">Pickup Location</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Government"
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.from ? 'border-red-500' : ''}`}
              />
              <input
                type="text"
                name="pickupCity"
                value={formData.pickupCity}
                onChange={handleChange}
                placeholder="City"
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupCity ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              placeholder="Address line"
              className={`background w-full p-2 border border-gray-300 rounded ${errors.pickupAddress ? 'border-red-500' : ''}`}
            />
            {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex text-sm font-medium titleLocation w-1/2">Pickup Time</label>
            <input
              type="datetime-local"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupTime ? 'border-red-500' : ''}`}
            />
            {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium titleLocation">Destination Location</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="Government"
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.to ? 'border-red-500' : ''}`}
              />
              <input
                type="text"
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleChange}
                placeholder="City"
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.destinationCity ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
            <input
              type="text"
              name="destinationAddress"
              value={formData.destinationAddress}
              onChange={handleChange}
              placeholder="Address line"
              className={`background w-full p-2 border border-gray-300 rounded ${errors.destinationAddress ? 'border-red-500' : ''}`}
            />
            {errors.destinationAddress && <p className="text-red-500 text-sm">{errors.destinationAddress}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex w-1/2 text-sm font-medium titleLocation">Arrival Time</label>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.arrivalTime ? 'border-red-500' : ''}`}
            />
            {errors.arrivalTime && <p className="text-red-500 text-sm">{errors.arrivalTime}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium titleLocation">Available Weight and Size</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="weight"
              value={formData.weight}
              placeholder="10.0 kg"
              onChange={handleChange}
              className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.weight ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="size"
              value={formData.size}
              placeholder="2.0 msq"
              onChange={handleChange}
              className={` background w-1/2 p-2 border border-gray-300 rounded ${errors.size ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
          {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium titleLocation">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write notes for clients..."
            className={`decription background w-full p-2 border border-gray-300 rounded ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
      </div>
    </>
  );
}

export default Form;
