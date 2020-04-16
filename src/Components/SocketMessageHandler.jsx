import { useContext, useEffect } from 'react';
import SocketContext from '../Context/SocketContext';
import AppContext from '../Context/AppContext';

const SocketMessageHandler = () => {
    let { receiveSocket, onMessage, message } = useContext(SocketContext);
    const { setStatus, setAlert, setConnected, setAlertMessage } = useContext(AppContext);

    useEffect(() => {
        if (message === undefined) return;
        if (message.action === 'context') {
            setStatus(message.status);
            setAlert(message.alert);
            setConnected(true);
            return;
        }

        if (message.action === 'set_status') {
            setStatus(message.value);
            if (message.value === 'disarmed') setAlert(false);
            return;
        }

        if (message.action === 'alert') {
            setAlert(true);
            setAlertMessage(message.device_message);
            return;
        }

        console.warn("UNKNOWN MESSAGE", message);
    }, [message]);

    return null;
}

export default SocketMessageHandler;