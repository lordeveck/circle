import io from 'socket.io-client';

const connectToSocket = () => {
    console.log('hey')
    const socket = io('http://localhost:3000', { transports: ['websocket'] });
    return socket;
};

export {
    connectToSocket,
};


