import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Adjust this URL to match your Flask server's address and port
const socket = io('http://localhost:5000');

const VideoStream = () => {
    const [currentFrame, setCurrentFrame] = useState('');
    const [fallDetected, setFallDetected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Flask server via Socket.IO');
            // Trigger the video stream to start on the server side
            socket.emit('start_stream', {});
        });

        socket.on('stream_frame', data => {
            // Update the state with the latest frame and fall detection status
            setCurrentFrame(data.image);
            setFallDetected(data.fallDetected);
        });

        return () => {
            // Cleanup when the component unmounts
            socket.off('connect');
            socket.off('stream_frame');
        };
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                {fallDetected && <div style={{ color: 'red', fontWeight: 'bold' }}>Fall Detected!</div>}
            </div>
            <img src={'http://localhost:5000'} alt="webcam" />
        </div>

    );
};

export default VideoStream;