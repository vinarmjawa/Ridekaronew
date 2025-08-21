import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Userlogout = () => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
        localStorage.removeItem('userToken');
            navigate('/login')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default Userlogout
