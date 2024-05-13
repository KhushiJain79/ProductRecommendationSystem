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

function App() {
  return (
    <>
    
    <Router>

    <Navbar/>
    <Routes>
           
    <Route  exact path="/" element={<Home/>}/>
    <Route  exact path="/contact" element={<Contact/>}/>
    </Routes>

    </Router>
    
    </>
    
    
  );
}

export default App;
