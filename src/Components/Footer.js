import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8"> {/* Increased padding */}
      <div className="max-w-[1280px] mx-auto px-4 flex justify-between">
        <div>
          <h3 className="text-2xl font-bold">Shanta Share</h3> {/* Increased font size */}
          <p className="text-lg">&copy; {new Date().getFullYear()} Shanta Share, All Rights Reserved</p> {/* Increased font size */}
        </div>
        <div className="flex gap-6"> 
        <Link to="/" className="hover:underline text-lg">Home</Link> {/* Use Link instead of a tag */}
        <Link to="/about" className="hover:underline text-lg">About Us</Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;