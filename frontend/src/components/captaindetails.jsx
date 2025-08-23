
import React, { useEffect, useState } from 'react'


const CaptainDetails = (props) => {
const [fare,setfare]= useState(0)
const [timeOnline, setTimeOnline] = useState(0);
const [startTime, setStartTime] = useState(
    () => parseInt(localStorage.getItem("startTime")) || Date.now()
  );
  useEffect(() => {
    // Save start time in localStorage
    localStorage.setItem("startTime", startTime);

    const interval = setInterval(() => {
      setTimeOnline(Math.floor((Date.now() - startTime) / 60000));
    }, 60000);

    return () => clearInterval(interval);
  }, [startTime]);
  useEffect(() => {
    localStorage.setItem("timeOnline", timeOnline);
  }, [timeOnline]);

  const minutes = Math.floor((timeOnline % 3600) / 60);

    return (
        <div>
            <div className='flex  justify-between text-gray-800'>
                <div className='flex items-center justify-start gap-2'>
               <i className="ri-user-fill text-4xl h-10 w-10 rounded-full object-cover"></i>
                    <h4 className='text-lg font-medium capitalize'>vinarm</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>{fare} rs</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-5 mt-8 bg-gray-100 text-gray-800 rounded-xl justify-between gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>{minutes}    <span className='text-gray-500 text-sm font-sm'>min </span></h5>
       
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
                    <p className='text-sm text-gray-600'>rides</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails;