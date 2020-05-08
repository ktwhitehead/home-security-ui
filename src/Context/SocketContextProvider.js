import React, { useState } from 'react';
import SocketContext from './SocketContext';
import useWebSocket from '../Hooks/useWebSocket';

const SocketContextProvider = ({children}) => {
    // Node red requires separate socket connections for sending and receiving
    const { socket, setOnOpen } = useWebSocket('ws://192.168.68.108:1880/send');
    const { setOnMessage, setOnClose } = useWebSocket('ws://192.168.68.108:1880/receive');
    const [message, setMessage] = useState();

    const context = { socket, setOnOpen, setOnClose, setOnMessage, message, setMessage };
    return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
};

export default SocketContextProvider;
 