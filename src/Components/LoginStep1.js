import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginStep1 = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to check if the input exists in localStorage
  const checkInLocalStorage = (input) => {
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    
    const userData = input.trim().toLowerCase();
  
    // Check if the input matches either the email or the phone
    const emailInput = email ? email.toLowerCase() : '';
    const phoneInput = phone ? phone.toLowerCase() : '';
  
    return userData === emailInput || userData === phoneInput;
  };

  // Function to validate input and navigate
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      setError('Please enter a phone number or email.');
    } else if (!checkInLocalStorage(inputValue)) {
      setError('No account found with this phone number or email.');
    } else {
      setError('');
      // Navigate to step 2 login if validation passes
      navigate('/loginStep2', { state: { inputValue } });
    }
  };

  // Redirect to the registration page
  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">What's your phone number or email?</h1>
        <form onSubmit={handleLogin}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter phone number or email"
            className="px-4 py-2 border rounded-md w-full mb-6 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
            title="Please fill in this field."
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </form>
        <p className="mb-2">You don't have an account?</p>
        <button
          type="button"
          onClick={handleRedirect}
          className="text-blue-600 hover:underline"
        >
          Sign up here
        </button>
      </div>
    </div>
  );
};

export default LoginStep1;
