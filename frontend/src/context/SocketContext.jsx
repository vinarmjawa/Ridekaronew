// frontend/src/context/SocketContext.jsx
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Ensure this points to your RENDER URL (no trailing slash)
const SOCKET_URL = import.meta.env.VITE_BASE_URL; 

const socket = io(SOCKET_URL, {
    transports: ["websocket"], // Forces WebSocket only (skips polling)
    withCredentials: true,
    autoConnect: true
});

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket Connection Error:', err.message);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
