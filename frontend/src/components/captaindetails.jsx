import React, { useContext } from 'react'
import { captainDatacontext } from '../context/captainContext';

const CaptainDetails = (props) => {
    const { captain } = useContext(captainDatacontext);

    // Calculation: Total minutes = number of rides * 30
    // Optional: Divide by 60 if you want to show Hours
    const totalMinutes = props.rides * 30;
    const displayTime = totalMinutes >= 60 
        ? `${(totalMinutes / 60).toFixed(1)} Hours` 
        : `${totalMinutes} Mins`;

    if (!captain) {
        return <div className="p-5 text-center">Loading captain details...</div>;
    }

    return (
        <div>
            <div className='flex justify-between text-gray-800'>
                <div className='flex items-center justify-start gap-2'>
                    <i className="ri-user-fill text-4xl h-10 w-10 rounded-full object-cover"></i>
                    <h4 className='text-lg font-medium capitalize'>
                        {captain.fullname.firstname + " " + captain.fullname.lastname}
                    </h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹{props.totalFare}</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>

            <div className='flex p-5 mt-8 bg-gray-100 text-gray-800 rounded-xl justify-between gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    {/* Updated to use the calculated time */}
                    <h5 className='text-lg font-medium'>{displayTime}</h5>
                    <p className='text-sm text-gray-600'>Time Online</p>
                </div>

                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-star-half-s-line"></i>
                    <h5 className='text-lg font-medium'>4.0</h5>
                    <p className='text-sm text-gray-600'>Ratings</p>
                </div>

                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>{props.rides}</h5>
                    <p className='text-sm text-gray-600'>Rides</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails;
