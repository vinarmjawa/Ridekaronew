import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import Finishcap from "../components/Finishcap";
import LiveTracking from "../components/Livetracking";

const Captainquickride = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride
     const distanceInKm = rideData ? (rideData.distanceTime.distance.value / 1000).toFixed(1) : 0;
  useGSAP(
    () => {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(overlayRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 relative">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="src/assets/output-onlinepngtools.png"
          alt="logo"
          className="w-32 h-auto"
        />
      </div>

      {/* Logout */}
      <div className="absolute top-4 right-4 z-10 text-gray-800 text-2xl p-6">
        <Link to="/captainlogout">
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Main Card */}
      <div className="flex h-screen w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
        {/* Map Section */}
        <div className="relative h-4/5 w-full">
           <LiveTracking></LiveTracking>
          <Link
            to="/captainpage"
            className="absolute top-3 right-3 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-green-600 transition"
          >
            <i className="ri-home-3-line text-lg"></i>
          </Link>
        </div>

   
        <div
          className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 cursor-pointer"
          onClick={() => setFinishRidePanel(true)}
        >
          <h5 className="p-1 text-center w-[90%] absolute top-0">
            <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl text-gray-800 font-semibold">{distanceInKm } KM away</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 opacity-0 pointer-events-none z-[400]"
        onClick={() => setFinishRidePanel(false)}
      ></div>

      {/* Bottom Sheet */}
      <div
        ref={finishRidePanelRef}
        className="fixed z-[500] bottom-0 w-full max-w-md  
          bg-white p-4 py-10 rounded-t-2xl "
        style={{ transform: "translateY(100%)" }} // hidden initially
      >
        <Finishcap setFinishRidePanel={setFinishRidePanel} ride={rideData} distanceInKm={distanceInKm} />
      </div>
    </div>
  );
};

export default Captainquickride;
