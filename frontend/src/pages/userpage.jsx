import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/output-onlinepngtools.png';
const Userpage = () => {
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6 relative">
      {/* Positioned Logo */}
      <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="logo" className="w-36 h-10" />
      </div>

      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, User!</h1>
        <p className="text-lg text-gray-600 mb-10">Choose your cab</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Share Ride Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Share Ride</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Pick up multiple passengers along your route to maximize your earnings. This option is perfect for high-demand areas and common travel routes.
            </p>
          </div>
          <Link 
            to='/home' 
            className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 text-center"
          >
            Start Share Ride
          </Link>
        </div>

        {/* Quick Ride Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quick Ride</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Get a single, direct ride request for a faster, more focused trip. This is ideal for when you want to complete a single trip quickly and efficiently.
            </p>
          </div>
          <Link to='/quick' className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-black transition duration-300">
            Start Quick Ride
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Userpage;