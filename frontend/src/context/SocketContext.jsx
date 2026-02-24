import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [quizState, setQuizState] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        // Determine backend URL (assuming it runs on port 5000 locally)
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const newSocket = io(backendUrl);

        newSocket.on('server:state_update', (data) => {
            setQuizState(data);
            if (data.remainingTime !== undefined && data.state?.status === 'active') {
                setTimer(data.remainingTime);
            }
        });

        newSocket.on('server:timer_sync', (seconds) => {
            setTimer(seconds);
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    // Timer countdown effect
    useEffect(() => {
        let intervalId;
        if (quizState?.state?.status === 'active' && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prev) => Math.max(0, prev - 1));
            }, 1000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [quizState?.state?.status, timer]);

    return (
        <SocketContext.Provider value={{ socket, quizState, timer }}>
            {children}
        </SocketContext.Provider>
    );
};
