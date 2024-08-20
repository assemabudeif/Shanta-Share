import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    age: '',
    government: '',
    mobile: '',
    gender: '',
    vehicle: '',
    idImage: null,
    personalImage: null,
    licenseImage: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');



  // ========   Regular Expression and Data Validation   ==========


  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    name: /^[a-zA-Z]+$/,
    address: /^[a-zA-Z0-9\s,'-]+$/,
    city: /^[a-zA-Z\s]+$/,
    mobile: /^[0-9]{10,15}$/,
    government: /^[a-zA-Z\s]+$/,
    vehicle: /^[a-zA-Z0-9\s,'-]+$/,
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!regex.email.test(value)) {
          error = 'Invalid email address.';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (!regex.password.test(value)) {
          error = 'Password must be at least 6 characters long, include at least one number, one lowercase letter, and one uppercase letter.';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Confirm Password is required.';
        } else if (value !== formData.password) {
          error = 'Passwords do not match.';
        }
        break;
      case 'firstName':
      case 'lastName':
        if (!value) {
          error = 'This field is required.';
        } else if (!regex.name.test(value)) {
          error = 'Name must contain only letters.';
        }
        break;
      case 'address':
        if (!value) {
          error = 'Address is required.';
        } else if (!regex.address.test(value)) {
          error = 'Address is not valid.';
        }
        break;
      case 'vehicle':
        if (!value) {
          error = 'Vehicle Informations is required.';
        } else if (!regex.vehicle.test(value)) {
          error = 'Vehicle Informations is not valid.';
        }
        break;
      case 'city':
        if (!value) {
          error = 'City is required.';
        } else if (!regex.city.test(value)) {
          error = 'City must contain only letters.';
        }
        break;
      case 'mobile':
        if (!value) {
          error = 'Mobile number is required.';
        } else if (!regex.mobile.test(value)) {
          error = 'Mobile number is not valid.';
        }
        break;
      case 'government':
        if (!value) {
          error = 'Government field is required.';
        } else if (!regex.government.test(value)) {
          error = 'Government name is not valid.';
        }
        break;

      case 'idImage':
      case 'personalImage':
      case 'licenseImage':
        if (!value) {
          error = 'This field is required.';
        }
        break;
      default:
        break;
    }
    return error;
  };


  // ==================== Handle Input =====================



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const files = e.target.files;
    let error = '';

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      error = validateField(name, value);
    }
    setErrors({ ...errors, [name]: error });
  };



  // ================== Steps Validation ==========================


  // Handle Step Navigation
  const handleNext = (e) => {
    e.preventDefault();
    let errorMessages = {};

    if (!role) errorMessages.role = 'Role is required.';

    if (step === 2) {
      errorMessages = {
        ...errorMessages,
        email: validateField('email', formData.email),
        password: validateField('password', formData.password),
        confirmPassword: validateField('confirmPassword', formData.confirmPassword),
        firstName: validateField('firstName', formData.firstName),
        lastName: validateField('lastName', formData.lastName),
      };
    } else if (step === 3) {
      if (role === 'client') {
        errorMessages = {
          ...errorMessages,
          address: validateField('address', formData.address),
          city: validateField('city', formData.city),
          age: validateField('age', formData.age),
          mobile: validateField('mobile', formData.mobile),
        };
      } else if (role === 'driver') {
        errorMessages = {
          ...errorMessages,
          address: validateField('address', formData.address),
          city: validateField('city', formData.city),
          mobile: validateField('mobile', formData.mobile),
          government: validateField('government', formData.government),
          vehicle: validateField('vehicle', formData.vehicle),
          personalImage: validateField('personalImage', formData.personalImage),
          idImage: validateField('idImage', formData.idImage),
          licenseImage: validateField('licenseImage', formData.licenseImage),
        };
      }
    }
    setErrors(errorMessages);
    if (Object.values(errorMessages).every(msg => msg === '')) {
      setStep(step + 1);
    }
  };



  // =======  handle back buttonon ======

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  // =======  Submit button ======

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4) {
      SetDataLocal(e); 
    }
  };

  const renderAlert = (field) => (
    errors[field] ? (
      <div className="text-red-600 text-sm mt-1">{errors[field]}</div>
    ) : null
  );


  // ============== Confirmation Before user submit    ================

  const renderConfirmation = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Confirm Your Details</h2>
      <div className="space-y-4">
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
        <div>
          <strong>Name:</strong> {formData.firstName} {formData.lastName} {formData.age}
        </div>
        <div>
          <strong>Age:</strong>  {formData.age}
        </div>
        <div>
          <strong>Address:</strong> {formData.address}, {formData.city}, {formData.government}
        </div>
        <div>
          <strong>Mobile:</strong> {formData.mobile}
        </div>
        {role === 'driver' && (
          <>
            <div>
              <strong>Vehicle:</strong> {formData.vehicle}
            </div>
            <div>
              <strong>Personal Image:</strong> {formData.personalImage ? formData.personalImage.name : 'Not uploaded'}
            </div>
            <div>
              <strong>ID Image:</strong> {formData.idImage ? formData.idImage.name : 'Not uploaded'}
            </div>
            <div>
              <strong>License ID Image:</strong> {formData.licenseImage ? formData.licenseImage.name : 'Not uploaded'}
            </div>

          </>
        )}
      </div>
      {successMessage ? (
        <div className="mb-4 p-4 rounded-lg bg-yellow-100 text-yellow-700">
          {successMessage}
        </div>
      ) : (
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-gray-400 text-white py-2 px-4 rounded-lg"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Confirm
          </button>
        </div>
      )}
    </div>

    )

    const SetDataLocal = (e) => {
      e.preventDefault(); // Prevent form submission
    
      if (role) {
        // Store only the specified fields in local storage
        localStorage.setItem('email', formData.email);
        localStorage.setItem('phone', formData.mobile); 
        localStorage.setItem('password', formData.password);
        localStorage.setItem('name', `${formData.firstName} ${formData.lastName}`);
    
        // Set success message
        setSuccessMessage('Thank you! Your data is under approval now.');
      } else {
        // Set role error if not selected
        setErrors((prevErrors) => ({ ...prevErrors, role: 'Role is required.' }));
      }
  
    
};





  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
      <div className="flex items-center mb-8">
        {['Role Selection', 'Login Info', role === 'client' ? 'Client Info' : 'Driver Info', 'Confirmation'].map((text, index) => (
          <React.Fragment key={index}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${step >= index + 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'}`}>
              {step > index + 1 ? <FaCheck /> : index + 1}
            </div>
            {index < 3 && <div className="w-1/4 h-1 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
          <div className="flex flex-col items-center space-y-4">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`text-2xl px-4 py-2 rounded-lg ${role === 'client' ? 'bg-black text-white' : 'bg-gray-200'
                }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setRole('driver')}
              className={`text-2xl px-4 py-2 rounded-lg ${role === 'driver' ? 'bg-black text-white' : 'bg-gray-200'
                }`}
            >
              Driver
            </button>
            {renderAlert('role')}
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={handleNext}
              className="bg-black text-white py-2 px-4 rounded-lg"
            >
              Next
            </button>
          </div>

        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Enter Your Login Information</h2>
          <form onSubmit={handleNext}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-4 w-full"
                />
                {renderAlert('firstName')}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-4 w-full"
                />
                {renderAlert('lastName')}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-4 w-full"
                />
                {renderAlert('email')}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-4 w-full"
                />
                {renderAlert('password')}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-4 w-full"
                />
                {renderAlert('confirmPassword')}
              </div>
              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{role === 'client' ? 'Client Information' : 'Driver Information'}</h2>
          <form onSubmit={handleNext}>
            <div className="space-y-4">
              {role === 'client' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Government</label>
                    <input
                      type="text"
                      name="government"
                      value={formData.government}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('government')}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('city')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('address')}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('mobile')}
                  </div>
                </>
              )}
              {role === 'driver' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Government</label>
                    <input
                      type="text"
                      name="government"
                      value={formData.government}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('government')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('city')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('address')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('mobile')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Vehicle Model</label>
                    <input
                      type="text"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('vehicle')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Personal Image</label>
                    <input
                      type="file"
                      name="personalImage"
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('personalImage')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">ID Image</label>
                    <input
                      type="file"
                      name="idImage"
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('idImage')}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">License ID Image</label>
                    <input
                      type="file"
                      name="licenseImage"
                      onChange={handleChange}
                      className="border rounded-lg py-2 px-4 w-full"
                    />
                    {renderAlert('licenseImage')}
                  </div>
                </>
              )}
              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg"
                >
                  Next
                </button>
              </div>
              
            </div>
          </form>
        </div>
        
      )}
      {step === 4 && renderConfirmation()}
    </div>
  );
};

export default RegistrationForm;
