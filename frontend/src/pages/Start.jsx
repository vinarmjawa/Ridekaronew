
import React from 'react'
import { RiTimer2Line, RiShieldCheckLine, RiPriceTag3Line } from 'react-icons/ri';
import backgroundImage from '../assets/Gemini_Generated_Image_4x0djv4x0djv4x0d.png';
import { Link } from 'react-router-dom';
const Start = () => {
  return (
     <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="pt-10 ">
        <img className="ml-16 w-32 h-10" src='/src/assets/logo.png' alt="App Logo" />
      </div>

 <div className="flex-grow flex flex-col justify-center items-center px-4 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg mb-8">
          The Smart Way to Travel 
        </h1>
        <div className="flex justify-around w-full max-w-lg">
          <div className="flex flex-col items-center gap-2">
            <RiTimer2Line className="text-4xl" />
            <span className="font-semibold">Fast Pickups</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RiPriceTag3Line className="text-4xl" />
            <span className="font-semibold">Affordable Fares</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RiShieldCheckLine className="text-4xl" />
            <span className="font-semibold">24/7 Safety</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-4 sm:px-8 pb-8">
        <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-gray-800 capitalize mb-2">
            Get Started
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
    
            <Link to='/login' className=" flex items-center justify-center w-full bg-gray-200 text-gray-800 font-semibold text-lg py-3 rounded-xl hover:bg-gray-300 transition duration-300 ease-in-out">
              User Login
            </Link>
            
          
            <Link to='/captainlogin' className="flex items-center justify-center w-full bg-yellow-400 text-black font-bold text-lg py-3 rounded-xl hover:bg-yellow-500 transition duration-300 ease-in-out">
             Captain Login
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Start;

