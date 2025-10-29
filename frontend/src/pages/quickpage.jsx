import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import Vechilepanel from '../components/Vechilepanel'
import logo from '../assets/output-onlinepngtools.png';
import Locationpanel from '../components/Locationpanel';
import ConfirmRide from '../components/confirmride';
import Lookingfordriver from '../components/lookingfordriver';
import Waiting from '../components/waiting';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import { userDatacontext } from '../context/userContext';
import { useContext } from 'react';
import LiveTracking from '../components/Livetracking';

const QuickPage = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const waitingdriver = useRef(null)
  const panelcloseRef = useRef(null)
  const vechilefoundref = useRef(null)
  const [vehiclepanel, setvehiclepanel] = useState(false)
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehiclefound, setvehiclefound] = useState(false)
  const vehiclepanelref = useRef(null)
  const ConfirmRidePanelref = useRef(null)
  const [waiting, setwaiting] = useState(false)
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext)
  const { user } = useContext(userDatacontext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  socket.on('ride-confirmed', ride => {
    setvehiclefound(false)
    setwaiting(true);
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setwaiting(false)
    navigate('/userriding', { state: { ride } })
  })
  const handleInputChange = async (e, field) => {
    const value = e.target.value;
    if (field === 'pickup') {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveField(field);

    if (value.length > 2) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSuggestions(response.data);
        if (!panelOpen) setPanelOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setSuggestions([]);
  };
  async function findtrip() {
    setPanelOpen(false);
    setvehiclepanel(true);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quickride/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    setFare(response.data.fare);
  }
  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/quickride/create`, {
      pickup,
      destination,
      vehicleType,
      fare: fare[vehicleType]
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    const newRide = response.data
    socket.emit('new-ride', newRide)

  }
  const submitHandler = (e) => {
    e.preventDefault();
  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70vh',
        autoAlpha: 1
      })
      gsap.to(panelcloseRef.current, {
        opacity: 1,
        padding: 20

      })
    }
    else {
      gsap.to(panelRef.current, {
        height: '0vh',
        autoAlpha: 0
      })
      gsap.to(panelcloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])
  useGSAP(function () {
    if (vehiclepanel) {
      gsap.to(vehiclepanelref.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3
      })
    } else {
      gsap.to(vehiclepanelref.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3
      })
    }
  }, [vehiclepanel])

  useGSAP(function () {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelref.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3
      })
    } else {
      gsap.to(ConfirmRidePanelref.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3
      })
    }
  }, [ConfirmRidePanel])

  useGSAP(function () {
    if (vehiclefound) {
      gsap.to(vechilefoundref.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3
      })
    } else {
      gsap.to(vechilefoundref.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3
      })
    }
  }, [vehiclefound])

  useGSAP(function () {
    if (waiting) {
      gsap.to(waitingdriver.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3
      })
    } else {
      gsap.to(waitingdriver.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 0.3
      })
    }
  }, [waiting])

  return (


    <div className="flex min-h-screen items-center justify-center bg-white rounded-xl p-8 ">
      <div className="absolute top-4 left-4 z-10  p-4">
        <img src={logo} alt="logo" className="w-36  h-10" />

      </div>
      <div className="absolute top-4 right-4 z-10 text-gray-800 text-2xl p-4">
        <Link to='/userlogout'><i className="ri-logout-box-r-line"></i></Link>

      </div>
      <div className="relative w-full max-w-md mx-auto">
        <div className=" h-screen  w-full max-w-md  flex-col overflow-hidden rounded-xl bg-white shadow-2xl ">

          <div className="relative h-[70vh]  w-full">
            <LiveTracking></LiveTracking>
            {waiting && (
              <Link to='/userriding' className='absolute top-3 z-50 right-3 rounded-full bg-green-500 py-2 px-5 font-semibold text-white shadow-md'>
                <i className="ri-road-map-line"></i>
              </Link>
            )}
          </div>

          {/* 4. Bottom Half: "Find Trip" Section */}

          <div className='flex  flex-col justify-end h-screen  absolute top-0  pointer-events-none '>
            <div className=" h-[30vh] bg-white z-20    p-4 pointer-events-auto">
              <h3 ref={panelcloseRef} onClick={() => {
                setPanelOpen(false)
              }}
                className=' absolute opacity-0 text-black right-4 top-3 text-xl'>
                <i className="ri-arrow-down-s-line " ></i>
              </h3>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Find a ride
              </h2>
              <form onSubmit={(e) => {
                submitHandler(e);
              }}>
                {/* Input Group */}
                <div className="mt-6 flex items-center gap-x-4 ">
                  {/* Start and End Icons */}
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                    <div className="h-10 w-px bg-gray-300"></div>
                    <div className="h-2.5 w-2.5 bg-gray-900"></div>
                  </div>

                  {/* Input Fields */}
                  <div className="flex-1 space-y-3">
                    <input
                      onClick={() => {
                        setPanelOpen(true);
                        setActiveField('pickup');
                      }}
                      type="text"
                      value={pickup}
                      onChange={(e) => handleInputChange(e, 'pickup')}
                      placeholder="Enter pickup location"
                      className="w-full rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Where to?"
                      onClick={() => {
                        setPanelOpen(true);
                        setActiveField('destination');
                      }}
                      value={destination}
                      onChange={(e) => handleInputChange(e, 'destination')}
                      className="w-full rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

              </form>

            </div>
            <div ref={panelRef} className='bg-white rounded pointer-events-auto'>
              <button onClick={findtrip}
                className=' bg-gray-900 ml-8 font-bold text-white px-4 py-2 rounded-lg mt-3 w-5/6'>
                Find Trip
              </button>
              <Locationpanel
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                setvehiclepanel={setvehiclepanel}
                setPanelOpen={setPanelOpen}
              />

            </div>
          </div>
        </div>
        <div ref={vehiclepanelref} className='absolute z-30 w-full translate-y-full  max-w-md bottom-0 bg-white px-3 py-8'>
          <Vechilepanel setVehicleType={setVehicleType}
            fare={fare} setConfirmRidePanel={setConfirmRidePanel} setvehiclepanel={setvehiclepanel}></Vechilepanel>
        </div>
        <div ref={ConfirmRidePanelref} className='absolute z-30 w-full  translate-y-full  bottom-0 bg-white px-3 py-8'>
          <ConfirmRide createRide={createRide}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel} setvehiclefound={setvehiclefound}></ConfirmRide>
        </div>
        <div ref={vechilefoundref} className='absolute z-30 w-full   translate-y-full  bottom-0 bg-white px-3 py-8'>
          <Lookingfordriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
            setvehiclefound={setvehiclefound}></Lookingfordriver>
        </div>
        <div ref={waitingdriver} className='absolute z-40 translate-y-full w-full  bottom-0 bg-white px-3 py-8'>
          <Waiting
            ride={ride}
            setvehiclefound={setvehiclefound}
            setwaiting={setwaiting}
            waiting={waiting}>
          </Waiting>
        </div>
      </div>
    </div>
  );
};

export default QuickPage;