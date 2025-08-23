import React from 'react'
import { Link } from 'react-router-dom'

const Finishcap = (props) => {
  return (
     <div>
            <h5 className='p-1 text-center w-[93%] text-gray-400 absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold text-gray-800 mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 text-white '>
                     <i className="ri-user-line text-4xl "></i>
                    <h2 className='text-lg font-medium text-gray-800 '>username</h2>
                </div>
                <h5 className='text-lg font-semibold text-gray-600' >2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between text-gray-800 flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"style={{ fontSize: "25px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>pickup</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill" style={{ fontSize: "25px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>drop</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line" style={{ fontSize: "25px" }}></i>
                        <div>
                            <h3 className='text-lg font-medium'>fare </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>
<Link to='/captainquick'     className='w-full  flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finsh ride      

</Link>
                </div>
            </div>
        </div>
  )
}

export default Finishcap
