import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/captaindetails'
import RidePopUp from '../components/captainridepopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/confirmridepanel'

const Captainquick = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
      const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
          const confirmRidePopupPanelRef = useRef(null)
  const ridePopupPanelRef = useRef(null)
const [rides, setrides] = useState(() => {
    const storedRides = localStorage.getItem("rides");
    return storedRides ? Number(storedRides) : 0;
  });
  useEffect(() => {
    localStorage.setItem("rides", rides);
  }, [rides]);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        y: 0, 
        duration: 0.4,
        ease: 'power3.out'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        y: '100%',
        duration: 0.4,
        ease: 'power3.in'
      })
    }
  }, [ridePopupPanel])
    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel])
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
          <img
            src="src/assets/map.png"
            alt="Map of a city"
            className="h-full w-full object-cover"
          />
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
            <CaptainDetails rides={rides}/>
          </div>

          {/* Ride Popup Panel */}
          <div
            ref={ridePopupPanelRef}
            className="absolute left-0 right-0 bottom-0 z-30 translate-y-full bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-3 py-4"
          >
            <RidePopUp setRidePopupPanel={setRidePopupPanel}  setConfirmRidePopupPanel={setConfirmRidePopupPanel}  />
          </div>
          <div
         ref={confirmRidePopupPanelRef}
            className="absolute left-0 right-0 bottom-0 z-30 translate-y-full bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-3 py-5"
          >
           <ConfirmRidePopUp  setRidePopupPanel={setRidePopupPanel} setrides={setrides}  setConfirmRidePopupPanel={setConfirmRidePopupPanel}></ConfirmRidePopUp>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Captainquick
