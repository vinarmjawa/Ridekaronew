import React from 'react'

const Locationpanel = (props) => {
console.log(props);
const location =["mmm","sss","ttt"]
  return (
  
  
   <div className='p-4'>
    {
      location.map(function(elm,index){
         return <div key={index}
          onClick={()=>{
          props.setvehiclepanel(true)
          props.setPanelOpen(false)
         }}
         className='flex gap-4 border-2 p-3 border-gray-50 active:border-gray-500 rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full  text-black'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium text-gray-800'>{elm}</h4>
                    </div>
                    })
}
   </div>
  )
}

export default Locationpanel
