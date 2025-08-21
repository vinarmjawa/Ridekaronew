import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Userlogin from './pages/userlogin';
import Usersignup from './pages/usersignup';
import Captainlogin from './pages/captainlogin';
import Captainsignup from './pages/captainsignup';
import Start from './pages/Start';
import Home from './pages/home';
import UserProtectWrapper from './pages/userprotect';
import Userlogout from './pages/userlogout';
import Captainhome from './pages/captainhome';
import CaptainProtectWrapper from './pages/captainprotect';
import CaptainLogout from './pages/captainlogout';
import Captainpage from './pages/captainpage';
import Userpage from './pages/userpage';
import Quickpage from './pages/quickpage';
import CaptainRides from './pages/captainrides';
import Captainquick from './pages/captainquick';
import Riding from './pages/quickriding';
const App = () => {

  
  return (
  <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
      
    

   <Routes>
    <Route path='/' element={<Start />} />
    <Route path='/login' element={ <Userlogin/> }/>
    <Route path='/signup' element={<Usersignup />} />
    <Route path='/captainlogin' element={<Captainlogin />} />
    <Route path='/captainsignup' element={<Captainsignup />} /> 
    <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
    <Route path='/userlogout' element={<UserProtectWrapper><Userlogout /></UserProtectWrapper>} />
    <Route path='/userriding' element={<UserProtectWrapper><Riding></Riding></UserProtectWrapper>}></Route>
    <Route path='/captainhome' element={
      <CaptainProtectWrapper><Captainhome /></CaptainProtectWrapper>
    }/>
    <Route path='/captainlogout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>} />
    <Route path='/captainpage' element={<CaptainProtectWrapper><Captainpage /></CaptainProtectWrapper>} />
    <Route path='/userpage' element={<UserProtectWrapper><Userpage /></UserProtectWrapper>} />
    <Route path='/quick' element={<UserProtectWrapper><Quickpage /></UserProtectWrapper>} />
    <Route path='/captainrides' element={<CaptainProtectWrapper><CaptainRides /></CaptainProtectWrapper>}></Route>
    <Route path='/captainquick' element={<CaptainProtectWrapper><Captainquick /></CaptainProtectWrapper>} />
    </Routes>
    </div>
  )
}

export default App
