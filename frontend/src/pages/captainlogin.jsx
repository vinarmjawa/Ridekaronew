import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { captainDatacontext } from '../context/captainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/output-onlinepngtools.png';
const Captainlogin = () => {
  const navigate = useNavigate();
   const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
const { captain, setCaptain } = useContext(captainDatacontext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
    localStorage.setItem('captainToken', data.token);
      navigate('/captainpage')

    }

    setEmail('')
    setPassword('')
  }
  return (
     
    <div className="bg-gray-50 min-h-screen flex flex-col p-4">
      
      
        {/* Logo */}
        <div className="justify-start">
          <img src={logo} alt="logo" className="mt-4 mr-4 ml-4 w-36 h-10" />
        

        {/* Form Card */}
        <div className='flex-grow flex items-center justify-center '>
          <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <form className="  items-center  w-full" onSubmit={(e) => {
          submitHandler(e)
        }}>
          
          {/* Form Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Welcome Back!
            </h3>
            <p className="text-gray-500 mt-1">Log in to continue your journey.</p>
          </div>

          {/* Input Fields Container */}
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-600 block mb-1">Email Address</label>
              <input 
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email" 
                placeholder="you@example.com" 
                required 
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-gray-600 block mb-1">Password</label>
              <input
              value={password} 
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg mt-6 hover:bg-yellow-500 transition-colors"
          >
            Login
          </button>

        
 </form>
   {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? 
            <Link to='/captainsignup' className="font-semibold text-yellow-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-xs text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign in as Captain Button */}
          <Link to='/login' className=" flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors text-center">
            Sign in as user
          </Link>
          {/* Sign Up as Captain Button */}
         

      
        </div>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin;
