import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'



import React from 'react'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>





      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App












// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Home from "./pages/Home";


// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Home />} />

//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
