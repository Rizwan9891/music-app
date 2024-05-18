import React from 'react'
import { Link } from 'react-router-dom'
import './Css/Forbidden.css'
const Forbidden = () => {
  return (
    <div class="forbidden-wrapper">
    <div class="forbidden-box">
    <h1>403</h1>
    <p>Sorry, it's not allowed to go beyond this point!</p>
    <p><Link to="/">Please, go back this way.</Link></p>
    </div>
    </div>
  )
}

export default Forbidden
