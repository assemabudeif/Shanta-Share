import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const LoginStep2 = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { inputValue } = location.state || {}; 

    const Direct2= () => {
        if (inputValue.trim() === '') {
          
        } else {
          navigate('/');
        }
      };
  
      const handleRedirect = () => {
        navigate('/LoginStep1');
      };
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Enter password For</h1>
        <h1 className='mb-6 text-1xl'>{inputValue}   </h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          Direct2();
        }}>
        <input
          type="password"
          placeholder="password"
          className="px-4 py-2 border rounded-md w-full mb-6 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
           required
            title="Please fill in this field."
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
        
        <p className="mb-2">  Login with a differnt Account</p>
        <button
          type="button"
          onClick={handleRedirect}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
       </form>
       
      </div>
    </div>
    </>
  );
};

export default LoginStep2;
