import React from 'react';
import Footer from '../Components/Footer'; 
import NavBarComp from '../Components/NavBarComp';

function AboutUs() {
  return (
    <>
    <NavBarComp/>
      <div className="bg-gray-100 text-black py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">About Us</h1> 
          <p className="mb-8 text-lg">Shanta Share is a platform that connects drivers with clients to facilitate the delivery of products from city to city across Egypt. Our mission is to provide fast, reliable, and affordable transportation services that make it easier for people to send and receive goods safely.</p> {/* Increased font size */}

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Our Mission</h2> 
            <p className="text-lg">We reimagine the way products move across cities. Our goal is to provide a seamless experience for clients looking to transport goods while empowering drivers with more opportunities to earn.</p> {/* Increased font size */}
          </div>

          {/* Values Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Our Values</h2> 
            <ul className="list-disc ml-4 text-lg">
              <li>Reliability: We ensure timely and dependable deliveries.</li>
              <li>Safety: Both our drivers and clients' products are our top priority.</li>
              <li>Efficiency: We make city-to-city deliveries more accessible and cost-effective.</li>
              <li>Sustainability: We aim to make our operations environmentally friendly by optimizing routes and promoting fuel efficiency.</li>
            </ul> 
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">What We Offer</h2> 
            <p className="text-lg">We connect clients with drivers for the delivery of products across Egypt, helping bridge the gap between supply and demand, whether it’s personal deliveries or commercial transport needs.</p> {/* Increased font size */}
          </div>

        </div>
      </div>
      <Footer /> 
    </>
  );
}

export default AboutUs;
