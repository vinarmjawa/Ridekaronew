import React from 'react'

const RidePopUp = (props) => {
   const distanceInKm = (props.ride?.distanceTime?.distance?.value / 1000).toFixed(1);
      const duration = props.ride?.distanceTime?.duration?.text;
    return (

<div>
            <h5 className=' text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
            <h3 className='p-2 text-2xl font-semibold mb-5 text-gray-800'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg '>
                <div className='flex items-center gap-3 text-white'>
                 
                    < i className="ri-user-line text-3xl h-10 rounded-full object-cover w-10"></i>  
                    <h2 className='text-lg font-medium text-gray-800'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold text-gray-800'>{distanceInKm} Km</h5>
            </div>
            <div className='flex gap-2 justify-between text-gray-800 flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5  border-b-2'>
                        <i className="ri-map-pin-user-fill "style={{ fontSize: "30px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>pickup</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5  border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill" style={{ fontSize: "30px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>drop</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line" style={{ fontSize: "30px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.fare}rs</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                     <div className='flex items-center gap-5 p-3'>
                        <i className="ri-time-line" style={{ fontSize: "30px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>{duration}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Duration</p>
                        </div>
                    </div>
                </div>
                <div className=' w-full '>
                    <button onClick={() => {  props.setConfirmRidePopupPanel(true)
                       props.confirmRide()
                    }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

                    <button onClick={() => {
                                   props.setRidePopupPanel(false)

                    }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>


                </div>
            </div>
        </div>
    )
}

export default RidePopUp