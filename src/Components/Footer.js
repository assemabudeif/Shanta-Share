import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-[1280px] mx-auto px-4 flex justify-between">
        <div>
          <h3 className="text-xl font-bold">Shanta Share</h3>
          <p>&copy; {new Date().getFullYear()} Shanta Share, All Rights Reserved</p>
        </div>
        <div className="flex gap-4">
          <a href="#contact" className="hover:underline">About Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
