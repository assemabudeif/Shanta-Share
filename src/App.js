// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './index.css';
import DriverProfile from './components/driverProfile';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import PageNotFound from "./Pages/PageNotFound";

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
          <Route path="/driverProfile" element={<DriverProfile onSave={handleSave} />} />
          <Route path={"/post/:id"} element={<PostDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
