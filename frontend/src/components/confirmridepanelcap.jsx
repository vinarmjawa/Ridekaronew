import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("")
   const distanceInKm = (props.ride?.distanceTime?.distance?.value / 1000).toFixed(1);
   const navigate = useNavigate(); 
   const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quickride/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captainToken')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/quickcab', { state: { ride: props.ride } })
        }


    }

  return (
    <div className="relative p-4">
      {/* Close Handle */}
      <button
        type="button"
        className="absolute top-2 left-1/2 -translate-x-1/2"
        onClick={() => props.setConfirmRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400"></i>
      </button>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-5 text-gray-800 mt-8 text-center">
        Confirm this ride to Start
      </h3>

      {/* Passenger Info */}
      <div className="flex items-center justify-between p-3 text-gray-700 border-2 bg-yellow-400 rounded-lg">
        <div className="flex items-center text-white gap-3">
          <i className="ri-user-line text-4xl"></i>
          <h2 className="text-lg font-medium capitalize text-gray-800">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">{distanceInKm} KM</h5>
      </div>

      {/* Ride Details */}
      <div className="w-full mt-5 space-y-3 text-gray-800">
        <div className="flex items-center gap-5 border-b-2 pb-2">
          <i className="ri-map-pin-user-fill" style={{ fontSize: "30px" }}></i>
          <div>
            <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
            <p className="text-sm text-gray-600">pickup</p>
          </div>
        </div>
        <div className="flex items-center gap-5 border-b-2 pb-2">
          <i className="ri-map-pin-2-fill" style={{ fontSize: "30px" }}></i>
          <div>
            <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
            <p className="text-sm text-gray-600">drop</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-currency-line" style={{ fontSize: "30px" }}></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <form onSubmit={submitHander} className="mt-5">
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          className="bg-gray-100 px-6 py-4 font-mono text-lg text-gray-800 rounded-lg w-full"
          placeholder="Enter OTP"
        />

        <button 
          type="submit"
          className="w-full mt-3 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={() => {  
           props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
          }}
          className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp
