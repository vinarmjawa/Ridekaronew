import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Finalpage = () => {
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const ride = location.state?.ride;

  return (
       <div className="bg-gray-50 min-h-screen flex flex-col p-4">
        <div className="justify-start">
          <img src='src/assets/output-onlinepngtools.png' alt="logo" className="mt-4 mr-4 ml-4 w-36 h-10" />
      
        <div className='flex-grow flex items-center justify-center '>
          <div className="w-full items-center max-w-sm bg-white p-8 rounded-2xl shadow">
        
         
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Ride Summary
            </h3>
          </div>
        {ride ? (
            <div className='mt-3'>
                <p className=" text-lg font-bold text-gray-800 ">Ride Details</p>
                 <p className='text-gray-600 text-lg font-semibold  '>Captain : {ride.captain?.fullname.firstname}</p> 
                <p className='text-gray-600 font-bold '>Vehicle no. {ride?.captain?.vehicle?.plate} {ride.captain?.vehicle?.vehicleType}</p>
                <p className='text-gray-600 '>{new Date().toLocaleString()}
                </p>
                <p className='text-gray-900 font-semibold  '> fare {ride.fare} rs</p>
                <div className='w-full mt-2'>
                    <div className='flex items-center  gap-2 text-gray-700'>
                        <i className="ri-map-pin-user-fill " style={{ fontSize: "25px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium text-gray-700'>{ride.pickup}</h3>
                        </div>
                    </div>
                    <div className='flex items-center mt-2 gap-2 text-gray-700'>
                        <i className="text-lg ri-map-pin-2-fill"  style={{ fontSize: "25px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>{ride.destination}</h3>
                            <p className='text-sm -mt-1 text-gray-600'></p>
                        </div>
                   </div>
                </div>
            </div>
        ) : (
            <p className="text-center text-gray-600">No ride details available.</p>
        )}
          <Link  to='/quick'
             className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg mt-6 hover:bg-yellow-500 transition-colors text-center block"
 > Book new ride
          </Link>
 <div className="mt-2 relative w-full">
      <input
        type="text"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Feedback"
        className="w-full rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
      />
      
        <button
          onClick={() => setFeedback("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
        >
         <i className="ri-arrow-right-line"></i>
        </button>
    
    </div>    

   {/* Sign Up Link */}
      
          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />    
            <hr className="flex-grow border-t border-gray-300" />
          </div>
         <div className='flex items-center justify-center mt-6'>
                <p className='text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-md'>
                  Hope you enjoy your journey Contact us if u have any issue through mail
                </p>

</div>
      
        </div>
        </div>
      </div>
    </div>
  )
}

export default Finalpage