import React, { useEffect, useState } from 'react';

const Something1 = () => {
  const [fallDetected, setFallDetected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/fall-detected')
        .then(response => response.json())
        .then(data => {
          if (data.fallDetected) {
            setFallDetected(true);
            // Assuming you want to stop polling after a fall is detected
            clearInterval(interval);
            // Trigger the call
            fetch('http://127.0.0.1:5000/trigger-call', { method: 'POST' })
              .then(response => response.json())
              .then(data => console.log(data.message))
              .catch(error => console.error('Error triggering call:', error));
          }
        })
        .catch(error => {
          console.error('Error fetching fall detection status:', error);
        });
    }, 500); // Poll every 500 milliseconds (0.5 second)
  
    return () => clearInterval(interval);
  }, []);
  
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
        )
      }
      </header>
    </div>
  );
}

export default Something1;