import React from 'react'
import './Css/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbarhw'>
      <div></div>
      <h2>Songwhip</h2>
      <p><Link className='plus' to="/LinkPut">+</Link></p>
    </div>
  )
}

export default Navbar
