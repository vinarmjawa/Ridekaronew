import React from 'react'

const Waiting = (props) => {
  return (
  <div>
      <h5 className=' text-center w-[93%] absolute top-0' onClick={() => {
props.setwaiting(false)
      }}>
        <i className="text-3xl text-gray-700 ri-arrow-down-wide-line"></i></h5>
<h3 className='text-2xl font-semibold mb-5 text-black'>Waiting for driver</h3>
      <div className='flex items-center text-gray-800 justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-bold capitalize'>vinarm</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>hr24 403924</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'> </h1>
        </div>
      </div>

     <div className='flex gap-2 justify-between text-gray-700 flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill" style={{ fontSize: "25px" }}></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'></p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"style={{ fontSize: "25px" }}></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'></p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'> 62 rs</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default Waiting
