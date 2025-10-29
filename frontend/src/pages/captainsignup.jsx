import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { captainDatacontext } from '../context/captainContext';
import axios from 'axios'
import { useContext } from 'react';
import logo from '../assets/output-onlinepngtools.png';
import { useNavigate } from 'react-router-dom';
const Captainsignup = () => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
const navigate = useNavigate()
const { captain, setCaptain } = useContext(captainDatacontext)

   const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.token)
      navigate('/captainpage')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  return (
   <div className='bg-gray-50 min-h-screen flex flex-col'>
            
            {/* --- Top Section: Logo and Form --- */}
            <div className="justify-start">

                    <img src={logo} alt="logo" className="mt-4 mr-4 ml-4 w-36 h-10" />
              

                {/* Form - no longer a card */}
               <div className='flex-grow flex items-center justify-center '>
          <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
                <form 
                    onSubmit={submitHandler}
                    className="items-center  w-full"
                >
                    {/* Form Header */}
                    <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-gray-800 ">
                            Create an account
                        </h3>
                        <p className="text-gray-500 mt-1">
                            Let's get you started on your journey.
                        </p>
                    </div>

                    {/* First and Last Name */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600  block mb-2">
                            Full Name
                        </label>
                        <div className='flex gap-4'>
                            <input
                                required
                                className=' text-black w-1/2 bg-gray-100  border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                required
                                className=' text-black w-1/2 bg-gray-100 border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                                type="text"
                                placeholder='Last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600  block mb-2">
                            Email address
                        </label>
                        <input
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-black bg-gray-100 border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            type="email"
                            placeholder='you@example.com'
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-sm font-semibold text-gray-600  block mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            className='w-full bg-gray-100 text-black  border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            type="password"
                            placeholder='Minimum 8 characters'
                        />
                    </div>
                    
                    {/* Vehicle Information */}
                    <div className="mt-4">
  <label className="text-sm font-semibold text-gray-600  block mb-2">
    Vehicle Information
  </label>
  {/* Vehicle Color */}
  <input
    required
    className="w-full text-black bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    type="text"
    placeholder="Vehicle Color"
    value={vehicleColor}
    onChange={(e) => setVehicleColor(e.target.value)}
  />
  {/* Vehicle Plate */}
  <input
    required
    className="w-full text-black bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    type="text"
    placeholder="Vehicle Plate"
    value={vehiclePlate}
    onChange={(e) => setVehiclePlate(e.target.value)}
  />
  {/* Vehicle Capacity */}
  <input
    required
    className="w-full text-black bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    type="number"
    min="1"
    placeholder="Vehicle Capacity"
    value={vehicleCapacity}
    onChange={(e) => setVehicleCapacity(e.target.value)}
  />
  {/* Vehicle Type */}
  <select
    required
    className="w-full text-black bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    value={vehicleType}
    onChange={(e) => setVehicleType(e.target.value)}
  >
    <option value="">Select Vehicle Type</option>
    <option value="car">car</option>
    <option value="auto">auto</option>
    <option value="motorcycle">motorcycle</option>
  </select>
</div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className='w-full bg-yellow-400 text-black font-bold py-3 rounded-lg mt-4 hover:bg-yellow-500 transition-colors'
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <p className='text-center text-sm text-gray-600 mt-4'>
                        Already have an account? <Link to='/captainlogin' className='font-semibold text-yellow-600 hover:underline'>Login here</Link>
                    </p>
                </form>
                </div>
                </div>
            </div>

            {/* --- Bottom Section: Footer Text --- */}
            <div className='flex items-center justify-center mt-6'>
                <p className='text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-md'>
                    This site is protected by reCAPTCHA and the <a href="#" className='underline'>Google Privacy Policy</a> and <a href="#" className='underline'>Terms of Service</a> apply.
                </p>
            </div>

        </div>
  )
}

export default Captainsignup;
