// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './index.css';
import DriverProfile from './components/driverProfile';

const handleSave = (updatedDriver) => {
  console.log('Saved Driver Data:', updatedDriver);
};

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mb-6">Driver Profile</h1>
      <DriverProfile onSave={handleSave} />
    </div>
  );
}

export default App;
