import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import PageNotFound from "./Pages/PageNotFound";
import DriverProfile from './Components/driverProfile';
import CustomerViewProfile from './Components/customerViewProfile';
import DriverViewProfile from './Components/driverVeiwProfile';
import ReviewsList from './Components/Reviews/reviewList';
import RegistrationForm from './Components/RegistrationForm';
import NavBarComp from "./Components/NavBarComp";
import LoginStep1 from "./Components/LoginStep1";
import LoginStep2 from "./Components/LoginStep2";

const handleSave = (updatedDriver) => {
  console.log('Saved Driver Data:', updatedDriver);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // Check localStorage on initial load
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <BrowserRouter>
      <NavBarComp isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="bg-transparent h-20"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/loginStep1' element={<LoginStep1 />} />
        <Route path='/loginStep2' element={<LoginStep2 />} />
        <Route path="/reviewList" element={<ReviewsList />} />
        <Route path="/driverProfile/:id" element={<DriverProfile onSave={handleSave} />} />
        <Route path="/customerViewProfile/:id" element={<CustomerViewProfile />} />
        <Route path="/driverViewProfile" element={<DriverViewProfile onSave={handleSave} />} />
        <Route path={"/post/:id"} element={<PostDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
