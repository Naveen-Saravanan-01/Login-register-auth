import React from 'react'
import './Home.css'
import {useNavigate} from "react-router-dom"
import Navbar from '../components/Navbar';

const Home = () => {

  const navigate=useNavigate();


  return (
    <div>
      <Navbar />
    <div className='home'>
      
      <h1>Welcome to Naveen's Website</h1>
      <button onClick={()=>navigate('/register')}>Get started</button>
    </div>

    </div>
  )
}

export default Home













// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Welcome to Our App</h1>
//       <p>Click below to register or login:</p>
//       <div style={{ marginTop: "10px" }}>
//         <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </div>
//   );
// }

// export default Home;
