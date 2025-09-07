import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/Livetracking';
const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

  socket.on("ride-ended", () => {
        navigate('/summary')
    })
  return (
    <div className="flex min-h-screen  items-center justify-center bg-white rounded-xl p-8 ">
         <div className="absolute top-4 left-4 z-10  p-4">
        <img src='src/assets/output-onlinepngtools.png' alt="logo" className="w-36  h-10" />
       
      </div>
<div className="flex h-screen  w-full max-w-md  flex-col overflow-hidden rounded-xl bg-white shadow-2xl ">
        
        <div className="relative h-[50vh] w-full">
         <LiveTracking></LiveTracking>

          <Link  to='/quick'className='absolute top-3 z-50 right-3 rounded-full bg-green-500 py-2 px-5 font-semibold text-white shadow-md'>
<i className="ri-home-3-line"></i>
          </Link>
       
        </div>
   
        {/* 4. Bottom Half: "Find Trip" Section */}
    
<div className='flex  flex-col justify-end  w-full  p-4 top-0 '>
          <div className='flex items-center text-gray-800 justify-between'>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-bold capitalize'>{ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
          <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}</p>
          <h1 className='text-lg font-semibold'> </h1>
        </div>
      </div>
         <div className='flex gap-2 justify-between text-gray-700 flex-col items-center'>
        <div className='w-full mt-5'>
       
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{ride?.destination}</h3>
              <p className='text-sm -mt-1 text-gray-600'></p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'> {ride?.fare} rs</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
        <Link
  to="/summary"
  state={{ ride: ride }}
  className="w-full h-14 bg-green-600 text-white font-semibold rounded-lg flex flex-col items-center justify-center hover:bg-green-700 transition-colors"
>
   <span className="text-md font-medium ">Make Your Payment</span>
  <span className="text-sm font-medium opacity-80">End This Ride</span>
</Link>

        </div>
        </div>
        </div>
  )
}

export default Riding