import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8"> 
      <div className="max-w-[1280px] mx-auto px-4 flex justify-between">
        <div>
          <h3 className="text-2xl font-bold">Shanta Share</h3> 
          <p className="text-lg">&copy; {new Date().getFullYear()} Shanta Share, All Rights Reserved</p> 
        </div>
        <div className="flex gap-6"> 
        <Link to="/" className="hover:underline text-lg">Home</Link> 
        <Link to="/about" className="hover:underline text-lg">About Us</Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
