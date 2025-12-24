import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// 1. Force 'websocket' transport to bypass Vercel/Render polling issues
// 2. autoConnect: true ensures it tries to connect immediately
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    transports: ['websocket'],
    autoConnect: true,
    withCredentials: true
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // 3. Optional: Add error logging to help debug in the browser console
        socket.on('connect_error', (err) => {
            console.log('Socket Connection Error:', err.message);
        });

        // Cleanup on unmount
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
