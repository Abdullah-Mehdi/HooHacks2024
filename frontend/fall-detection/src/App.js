// import './App.css';
// import NavBar from './Components/Navbar/NavBar';
// import { BrowserRouter,Routes,Route} from 'react-router-dom';
// import AboutUs from './Pages/AboutUs';
// import Something1 from './Pages/Something1';
// import LoginForm from './Components/LoginForm/LoginForm';
// import SignUpForm from './Components/SignUpForm/SignUpForm';


// function App() {
//   return (
//     <div>
      
//       <BrowserRouter>
//         <NavBar></NavBar>
//         <Routes>
//           <Route path='/aboutus' element={<AboutUs></AboutUs>}></Route>
//           <Route path='/something1' element={<Something1></Something1>}></Route>
//           <Route path='/login' element={<LoginForm></LoginForm>}></Route>
//           <Route path='/signup' element={<SignUpForm></SignUpForm>}></Route>
//         </Routes>
//       </BrowserRouter>

      
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';

function App() {
  const [fallDetected, setFallDetected] = useState(false);

  // Poll the backend to check for fall detection
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/fall-detected')
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
    <div className="App">
      <header className="App-header">
        <img src="/webcam" alt="Webcam Feed" style={{ width: '640px', height: '480px' }} />
        {fallDetected && (
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '24px' }}>
            Fall Detected!
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
