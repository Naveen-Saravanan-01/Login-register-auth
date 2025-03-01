import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className='navbar'>

            <h1>NAVEEN</h1>

            <button><Link to='/register'>Sign Up</Link></button>
            


        </nav>
    </div>
  )
}

export default Navbar