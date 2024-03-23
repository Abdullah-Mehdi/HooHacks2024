import './App.css';
import NavBar from './Components/Navbar/NavBar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import LoginForm from './Components/LoginForm/LoginForm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<AboutUs></AboutUs>}></Route>
          <Route path='/login' element={<LoginForm></LoginForm>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
