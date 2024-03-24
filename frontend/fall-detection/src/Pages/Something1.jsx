import React, { useEffect, useState } from 'react';

const Something1 = () => {
  const [fallDetected, setFallDetected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/fall-detected')
        .then(response => response.json())
        .then(data => {
          if (data.fallDetected && !fallDetected) {
            setFallDetected(true);
            // Trigger the call when a fall is detected for the first time
            fetch('http://127.0.0.1:5000/trigger-call', { method: 'POST' })
              .then(response => response.json())
              .then(data => console.log(data.message))
              .catch(error => console.error('Error triggering call:', error));
          }
        })
        .catch(error => {
          console.error('Error fetching fall detection status:', error);
        });
    }, 1000); // Poll every 1000 milliseconds (1 second)

    return () => clearInterval(interval);
  }, [fallDetected]);

  return (
    <div>
      <header>
        <img src="http://127.0.0.1:5000/webcam" alt="Webcam Feed" 
        style={{ 
          width: '640px', 
          height: '480px',
          margin: '200px'}} />
        {fallDetected && (
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '24px' }}>
            Fall Detected!
          </p>
        )}
      </header>
    </div>
  );
}

export default Something1;