import './App.css';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Store from './components/Store'
import Cart from './components/Cart'
import AboutUser from './components/AboutUser';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Store/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/user' element={<AboutUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
