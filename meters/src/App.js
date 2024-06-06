import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Contact from './component/Contact';
import About from './component/About';

function App() {
  return (
    <>
    
    <Router>

    <Navbar/>
    <Routes>
    <Route  exact path="/" element={<Home/>}/>
    <Route  exact path="/home" element={<Home/>}/>
    <Route  exact path="/about" element={<About/>}/>
    <Route  exact path="/contact" element={<Contact/>}/>
    </Routes>

    </Router>
    
    </>
    
    
  );
}

export default App;
