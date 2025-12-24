// src/pages/home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/output-onlinepngtools.png';

// --- SUB-COMPONENT: Search Form ---
const SearchForm = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ from, to });
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg flex-col md:flex-row gap-4 items-center">
            <input 
                type="text" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
                placeholder="From" 
                required 
                className="flex-grow text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 w-full"
            />
            <input 
                type="text" 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                placeholder="To" 
                required 
                className="flex-grow text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 w-full"
            />
            <button type="submit" className="w-full md:w-auto bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors">
                Search
            </button>
        </form>
    );
};

// --- SUB-COMPONENT: Available Ride Card ---
const RideCard = ({ ride, onBook }) => {
    return (
        <div className="ride-card bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition-shadow">
            <div>
                <p className='text-gray-800 font-bold text-lg'>{ride.startLocation} → {ride.endLocation}</p>
                <p className='text-gray-600'>Driver: <span className="font-medium">{ride.driver?.fullname?.firstname}</span></p>
                <p className='text-gray-500 text-sm'>Departure: {new Date(ride.departureTime).toLocaleString()}</p>
            </div>
            <div className="text-right">
                <p className="text-2xl text-green-600 font-bold">₹{ride.pricePerSeat}</p>
                <p className='text-gray-500 text-xs mb-2'>{ride.availableSeats} seats left</p>
                <button 
                    onClick={() => onBook(ride._id)} 
                    className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-black transition-colors"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: Booked Ride Card ---
const BookedRideCard = ({ booking }) => {
    const { ride } = booking;
    if (!ride) return null;

    return (
        <div className="booked-ride-card bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-xl text-gray-800">{ride.startLocation} to {ride.endLocation}</p>
                    <p className="text-sm text-gray-600 font-medium">Date: {new Date(ride.departureTime).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">₹{ride.pricePerSeat}</p>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">CONFIRMED</span>
                </div>
            </div>
            {ride.driver && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-800">Driver: {ride.driver.fullname.firstname}</p>
                        <p className="text-sm text-gray-500">{ride.driver.vehicle.color} {ride.driver.vehicle.vehicleType} • {ride.driver.vehicle.plate}</p>
                    </div>
                    <div className="text-xs text-gray-400 text-right italic">
                        Booking ID: {booking._id.slice(-6).toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bookedRides, setBookedRides] = useState([]); 
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'bookings'
    const [message, setMessage] = useState('Find a ride to your destination.');

    const fetchBookedRides = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) return;
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

    useEffect(() => {
        fetchBookedRides();
    }, []);

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
                { rideId: rideId, seats: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Ride booked successfully!');
            await fetchBookedRides(); // Refresh booked list
            setActiveTab('bookings'); // Redirect user to see their booking
        } catch (error) {
            alert('Failed to book ride.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 md:p-10 gap-8">
            {/* Logo Section */}
            <div className="w-full max-w-6xl flex justify-between items-center">
                <img src={logo} alt="Ride Karo Logo" className="w-32 h-auto" />
                
                {/* Tab Switcher */}
                <div className="flex bg-white rounded-xl shadow-sm p-1 border border-gray-200">
                    <button 
                        onClick={() => setActiveTab('search')}
                        className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'search' ? 'bg-yellow-400 text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Find Ride
                    </button>
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'bookings' ? 'bg-yellow-400 text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        My Bookings ({bookedRides.length})
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-2xl mt-4">
                {activeTab === 'search' ? (
                    <div className="flex flex-col gap-10">
                        <div className="text-center">
                            <h1 className="text-4xl text-gray-900 font-extrabold mb-2">Where are you going?</h1>
                            <p className="text-gray-500">Book affordable rides across the city.</p>
                        </div>
                        
                        <SearchForm onSearch={handleSearch} />
                        
                        <div className="flex flex-col gap-4">
                            {isLoading ? (
                                <div className="text-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                                    <p className="mt-4 text-gray-500">Scanning for drivers...</p>
                                </div>
                            ) : rides.length > 0 ? (
                                rides.map(ride => <RideCard key={ride._id} ride={ride} onBook={handleBook} />)
                            ) : (
                                <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">{message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="text-center mb-4">
                            <h2 className="text-3xl text-gray-900 font-bold">Your Bookings</h2>
                            <p className="text-gray-500">Manage your upcoming shared rides.</p>
                        </div>
                        
                        {bookedRides.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {bookedRides.map(booking => <BookedRideCard key={booking._id} booking={booking} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-400 mb-4">No rides booked yet.</p>
                                <button 
                                    onClick={() => setActiveTab('search')}
                                    className="text-yellow-600 font-bold hover:underline"
                                >
                                    Go book your first ride →
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
