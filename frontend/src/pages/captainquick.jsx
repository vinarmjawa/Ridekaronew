import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/captaindetails.jsx'
import RidePopUp from '../components/captainridepopup.jsx'
import ConfirmRidePopUp from '../components/confirmridepanelcap.jsx'
import { SocketContext } from '../context/SocketContext.jsx'
import { captainDatacontext } from '../context/captainContext.jsx'
import axios from 'axios'
import LiveTracking from '../components/Livetracking.jsx'

const Captainquick = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const [ ride, setRide ] = useState(null);
    const confirmRidePopupPanelRef = useRef(null)
    const ridePopupPanelRef = useRef(null)
    const { socket } = useContext(SocketContext)
    const { captain } = useContext(captainDatacontext)
    const [ rides, setrides ] = useState(() => {
        const storedRides = localStorage.getItem("rides");
        return storedRides ? Number(storedRides) : 0;
    });
    const [ timeOnline, setTimeOnline ] = useState("0 min");
    const [ totalFare, setTotalFare ] = useState(() => {
        const storedFare = localStorage.getItem("totalFare");
        return storedFare ? Number(storedFare) : 0;
    });

    useEffect(() => {
        // 1. Socket Connection & Location Updates
        if (captain) {
            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            });

            const updateLocation = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        socket.emit('update-location-captain', {
                            userId: captain._id,
                            location: {
                                ltd: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                        })
                    })
                }
            }

            // Update location immediately on load
            updateLocation();
            
            // Update location every 10 seconds
            const locationInterval = setInterval(updateLocation, 10000);

            // Cleanup interval on unmount
            return () => clearInterval(locationInterval);
        }
    }, [captain, socket]);

    useEffect(() => {
        // 2. Listen for New Rides
        socket.on('new-ride', (data) => {
            setRide(data);
            setRidePopupPanel(true);
        });
    }, [socket]);

    useEffect(() => {
        // 3. Dashboard Logic (Rides count & Time Online)
        const handleStorageChange = () => {
            const storedRides = localStorage.getItem("rides");
            setrides(storedRides ? Number(storedRides) : 0);
            
            const storedFare = localStorage.getItem("totalFare");
            setTotalFare(storedFare ? Number(storedFare) : 0);
        };

        window.addEventListener('storage', handleStorageChange);

        let startTime = localStorage.getItem("startTime");
        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem("startTime", startTime);
        }

        const interval = setInterval(() => {
            const elapsed = Date.now() - Number(startTime);
            const minutes = Math.floor(elapsed / 60000);
            const hours = Math.floor(minutes / 60);
            
            if (hours > 0) {
                setTimeOnline(`${hours}h ${minutes % 60}m`);
            } else {
                setTimeOnline(`${minutes} min`);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/quickride/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captainToken')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {/* Logo */}
            <div className="absolute top-4 left-4 z-10">
                <img
                    src="src/assets/output-onlinepngtools.png"
                    alt="logo"
                    className="w-32 h-auto"
                />
            </div>
            <div className="absolute top-4 right-4 z-10 text-gray-800 text-2xl p-6">
                <Link to='/captainlogout'><i className="ri-logout-box-r-line"></i></Link>
            </div>

            {/* Main Card */}
            <div className="flex h-screen w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
                {/* Map Section */}
                <div className="relative h-1/2 w-full">
                    <LiveTracking></LiveTracking>
                    <Link
                        to="/captainpage"
                        className="absolute top-3 right-3 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-green-600 transition"
                    >
                        <i className="ri-home-3-line text-lg"></i>
                    </Link>
                </div>

                {/* Details + Popup */}
                <div className="flex flex-col flex-1 justify-between relative p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Captain Details
                    </h2>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <CaptainDetails rides={rides} timeOnline={timeOnline} totalFare={totalFare}/>
                    </div>

                    {/* Ride Popup Panel */}
                    <div
                        ref={ridePopupPanelRef}
                        className={`absolute left-0 right-0 bottom-0 z-30 bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-3 py-4 transition-transform duration-300 ${ridePopupPanel ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <RidePopUp
                            ride={ride} 
                            setRidePopupPanel={setRidePopupPanel}  
                            setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
                            confirmRide={confirmRide}
                        />
                    </div>
                    <div
                        ref={confirmRidePopupPanelRef}
                        className={`absolute left-0 right-0 bottom-0 z-30 bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-3 py-5 transition-transform duration-300 ${confirmRidePopupPanel ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <ConfirmRidePopUp  
                            setRidePopupPanel={setRidePopupPanel} 
                            setrides={setrides} 
                            ride={ride}
                            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Captainquick
