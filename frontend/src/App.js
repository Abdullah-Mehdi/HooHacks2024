import './App.css';
import NavBar from './Components/Navbar/NavBar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import Something1 from './Pages/Something1';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';


function App() {
  return (
    <div>
      
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/aboutus' element={<AboutUs></AboutUs>}></Route>
          <Route path='/something1' element={<Something1></Something1>}></Route>
          <Route path='/login' element={<LoginForm></LoginForm>}></Route>
          <Route path='/signup' element={<SignUpForm></SignUpForm>}></Route>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;


