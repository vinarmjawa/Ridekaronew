
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/output-onlinepngtools.png';
const PublishRideForm = () => {
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState(1);
    const [pricePerSeat, setPricePerSeat] = useState(100);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const token = localStorage.getItem('captainToken');
        if (!token) {
            setMessage('You are not logged in. Please log in again.');
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/publish`,
                { startLocation, endLocation, departureTime, availableSeats, pricePerSeat },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Ride published successfully!');
        } catch (error) {
            setMessage('Failed to publish ride. Please try again.');
            console.error(error);
        }
    };
    
    // The form JSX will be here
    return (
        <div className="flex flex-col sm:flex-row gap-10 p-4 justify-center gap-20 items-center min-h-screen bg-gray-100">
         <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Publish a Ride</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} placeholder="From Location" required className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
                <input type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} placeholder="To Location" required className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
                <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
                <input type="number" min="1" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} placeholder="Available Seats" required className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
                <input type="number" min="0" value={pricePerSeat} onChange={(e) => setPricePerSeat(e.target.value)} placeholder="Price per Seat (₹)" required className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
                <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">Publish</button>
                {message && <p className="text-center mt-4">{message}</p>}
            </form>
        </div>
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Rides</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              View your published rides and see who has booked them. Manage your upcoming trips.
            </p>
          </div>
          <Link
            to='/captainrides'
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-center"
          >
            View My Rides
          </Link>
        </div>
</div>
    );
};


const Captainhome = () => {
  return (
    <div className="min-h-screen bg-gray-100 justify-start  flex flex-col items-center p-4">
        <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="logo" className="w-36 h-10" />
      </div>
      <h1 className="text-4xl text-gray-800 font-bold my-8">Captain Dashboard</h1>
      <PublishRideForm />
      {/* You can add a list of published rides here later */}
    </div>
  )
}

export default Captainhome;