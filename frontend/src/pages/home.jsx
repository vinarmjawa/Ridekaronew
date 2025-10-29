// src/pages/home.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import logo from '../assets/output-onlinepngtools.png';
// A new component for the search form
const SearchForm = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ from, to });
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full
         max-w-2xl bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" required className="flex-grow text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" required className="flex-grow text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"/>
            <button type="submit" className="w-full md:w-auto bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors">Search</button>
        </form>
    );
};

// A new component to display a single ride card
const RideCard = ({ ride, onBook }) => {
    return (
        <div className="ride-card bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <p className='text-gray-600 font-bold'>From: {ride.startLocation}</p>
                <p className='text-gray-600 font-bold'>To : {ride.endLocation}</p>
                <p className='text-gray-600'>Driver : {ride.driver.fullname.firstname}</p>
                <p className='text-gray-600'>Departure : {new Date(ride.departureTime).toLocaleString()}</p>
            </div>
            <div className="text-right">
                <p className="text-xl text-gray-800 font-bold">₹{ride.pricePerSeat}</p>
                <p className='text-gray-600'>{ride.availableSeats} seats left</p>
                <button onClick={() => onBook(ride._id)} className="mt-2 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-black">Book Now</button>
            </div>
        </div>
    );
};
const BookedRideCard = ({ booking }) => {
    const { ride } = booking;
    if (!ride) return null; // Don't render if ride is null

    const { driver } = ride;

    return (
        <div className="booked-ride-card bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800">{ride.startLocation} to {ride.endLocation}</p>
                    <p className="text-sm text-gray-600">On {new Date(ride.departureTime).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{ride.pricePerSeat}</p>
                    <p className="text-xs text-gray-800">{booking.seatsBooked} seat(s)</p>
                </div>
            </div>
            {driver && (
                <div className="mt-4 pt-4 border-t">
                    <p className="font-semibold text-gray-800">Driver: {driver.fullname.firstname}</p>
                    <div className="text-sm text-gray-600">
                        <p>Car: {driver.vehicle.color} {driver.vehicle.vehicleType}</p>
                        <p>Plate: {driver.vehicle.plate}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bookedRides, setBookedRides] = useState([]); 
    const [message, setMessage] = useState('Find a ride to your destination.');

    const handleSearch = async ({ from, to }) => {
        setIsLoading(true);
        setRides([]);
        setMessage('');
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/search?from=${from}&to=${to}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRides(response.data);
            if(response.data.length === 0) {
                setMessage('No rides found for this route.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Could not fetch rides.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBook = async (rideId) => {
        const token = localStorage.getItem('userToken');
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/book`,
                { rideId: rideId, seats: 1 }, // Assuming user books 1 seat
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Ride booked successfully! Please refresh search to see updated seat count.');
        } catch (error) {
            alert('Failed to book ride. It may be full.');
            console.error(error);
        }
    };
 useEffect(() => {
        const fetchBookedRides = async () => {
            const token = localStorage.getItem('userToken');
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/rides/my-booked-rides`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBookedRides(response.data);
            } catch (error) {
                console.error("Could not fetch booked rides", error);
            }
        };
        fetchBookedRides();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10 gap-10">
              <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="logo" className="w-36 h-10" />
      </div>
            {/* Booked Rides Section */}
            {bookedRides.length > 0 && (
                <div className="w-full max-w-2xl p-8 ">
                    <h2 className="text-2xl text-gray-800 font-bold mb-4">My Booked Rides</h2>
                    <div className="flex flex-col gap-4">
                        {bookedRides.map(booking => <BookedRideCard key={booking._id} booking={booking} />)}
                    </div>
                </div>
            )}

            <h1 className="text-4xl text-gray-800 font-bold ">Find Your Ride</h1>
            <SearchForm onSearch={handleSearch} />
            
            <div className="w-full max-w-2xl flex flex-col gap-6">
                {isLoading ? <p>Loading...</p> : rides.length > 0 ? (
                    rides.map(ride => <RideCard key={ride._id} ride={ride} onBook={handleBook} />)
                ) : (
                    <p className="text-center text-black">{message}</p>
                )}
            </div>
        </div>
    );
}

export default Home;