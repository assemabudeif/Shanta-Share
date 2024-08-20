// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './index.css';
// import DriverProfile from './components/driverProfile';
import CustomerViewProfile from './Components/customerViewProfile';
import DriverViewProfile from './Components/driverVeiwProfile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import PageNotFound from "./Pages/PageNotFound";
import DriverProfile from './Components/driverProfile';
// import ReviewCard from './components/Reviews/reviewCard';
import ReviewsList from './Components/Reviews/reviewList';
import RegistrationForm from './Components/RegistrationForm';

const handleSave = (updatedDriver) => {
  console.log('Saved Driver Data:', updatedDriver);
};

// function App() {
//   return (
//     <div className="App">
//       <h1 className="text-3xl font-bold text-center mb-6">Driver Profile</h1>

//     </div>


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/register' element={<RegistrationForm />} />
          {/* <Route path="/reviewCard" element={<ReviewCard />} /> */}
          <Route path="/reviewList" element={<ReviewsList />} />
          <Route path="/driverProfile/:id" element={<DriverProfile onSave={handleSave} />} />
          <Route path="/customerViewProfile/:id" element={<CustomerViewProfile />} />
          <Route path="/driverViewProfile" element={<DriverViewProfile onSave={handleSave} />} />
          <Route path={"/post/:id"} element={<PostDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
