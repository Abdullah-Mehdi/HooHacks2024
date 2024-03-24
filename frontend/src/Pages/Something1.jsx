// import React from 'react';
// import VideoStream from '../VideoStream';

// const Something1 = () => {
//     return(
//         <div>   
           
//         </div>
//     );
// };

// export default Something1;

import React, { useEffect, useState } from 'react';

const Something1 = () => {
  const [fallDetected, setFallDetected] = useState(false);

  // Poll the backend to check for fall detection
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/fall-detected')
        .then(response => response.json())
        .then(data => {
          setFallDetected(data.fallDetected);
        })
        .catch(error => {
          console.error('Error fetching fall detection status:', error);
        });
    }, 1000); // Poll every 1000 milliseconds (1 second)

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
        )}
      </header>
    </div>
  );
}

export default Something1;