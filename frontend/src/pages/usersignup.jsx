import React, { useContext, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import { userDatacontext } from '../context/userContext';
import axios from 'axios';
const Usersignup = () => {
 const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const [ userData, setUserData ] = useState({})
    const navigate = useNavigate()

    const { user, setUser } = useContext(userDatacontext)



     const submitHandler = async (e) => {
        e.preventDefault();
      const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
        // Your form submission logic here
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser,{ withCredentials: true })
    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
     localStorage.setItem('userToken', data.token)
      navigate('/userpage');
    }
      
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

    };
  return (
   <div className='bg-gray-50 min-h-screen flex flex-col'>
            
            {/* --- Top Section: Logo and Form --- */}
            <div className="justify-start">

                    <img src='src/assets/output-onlinepngtools.png' alt="logo" className="mt-4 mr-4 ml-4 w-36 h-10" />
              

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
                                className='w-1/2 bg-gray-100  border border-gray-200 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                required
                                className='text-black w-1/2 bg-gray-100 border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
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
                            className='text-black w-full bg-gray-100 border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
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
                            className='w-full bg-gray-100 text-black border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            type="password"
                            placeholder='Minimum 8 characters'
                        />
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
                        Already have an account? <Link to='/login' className='font-semibold text-yellow-600 hover:underline'>Login here</Link>
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

export default Usersignup;
