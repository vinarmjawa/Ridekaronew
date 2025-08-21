import React, { useState } from 'react'
import { createContext } from 'react'
export const userDatacontext = createContext()
const UserContext = ({children}) => {
     const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
    return (
  
  <div>
        <userDatacontext.Provider  value={{ user, setUser }}>
      {children}
  
   </userDatacontext.Provider>
    </div>
  )

}

export default UserContext
