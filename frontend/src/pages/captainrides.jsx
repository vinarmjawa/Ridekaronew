// src/pages/MyRides.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/output-onlinepngtools.png';
const CaptainRides = () => {
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMyRides = async () => {
            const token = localStorage.getItem('captainToken');
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/rides/my-rides`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRides(response.data);
                if (response.data.length === 0) {
                    setMessage('You have not published any rides yet.');
                }
            } catch (error) {
                console.error('Failed to fetch rides:', error);
                setMessage('Could not fetch your rides. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyRides();
    }, []);

    if (isLoading) {
        return <div className="text-center p-8">Loading your rides...</div>;
    }

    return (
        
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
  <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="logo" className="w-36 h-10" />
      </div>
            <div className="max-w-4xl mx-auto p-10">
                <div className="flex justify-between items-center mb-6">
                     <h1 className="text-3xl font-bold text-gray-800">My Published Rides</h1>
                     <Link to="/captainpage" className="text-yellow-600 hover:underline">Back to Dashboard</Link>
                </div>

                {rides.length > 0 ? (
                    <div className="space-y-6">
                        {rides.map((ride) => (
                            <div key={ride._id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4">
                                    <div>
                                        <p className="text-xl font-semibold text-gray-900">
                                            {ride.startLocation} to {ride.endLocation}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(ride.departureTime).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-right">
                                        <p className="text-lg font-bold text-gray-800">₹{ride.pricePerSeat}</p>
                                        <p className="text-sm font-medium text-gray-600">{ride.status}</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Booked Passengers</h3>
                                {ride.bookings && ride.bookings.length > 0 ? (
                                    <ul className="space-y-2">
                                        {ride.bookings.map((booking) => (
                                            <li key={booking._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                                <span className="text-gray-800 font-medium">
                                                    {booking.passenger.fullname.firstname} {booking.passenger.fullname.lastname}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {booking.seatsBooked} seat(s)
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No one has booked this ride yet.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white p-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <p className="text-gray-600">{message}</p>
                        <Link to="/captainhome" className="mt-4 inline-block bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                            Publish a Ride
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaptainRides;