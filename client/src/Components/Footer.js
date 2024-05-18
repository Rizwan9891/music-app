import React from 'react'
import './Css/Footer.css'
import { Link } from 'react-router-dom'
import addImg from './assests/icons8-add-48.png'
import analyticsImg from './assests/analytics2.jpeg'
import profileImg from './assests/profile.jpeg'
import { BackgroundImage } from '@mantine/core'
import { useSelector } from 'react-redux'
function Footer() {
  const reduxData=useSelector((state) => state.AuthReducer.data)
  return (
   <>
    <div className="footer-nav">
      <Link to='/LinkPut'><BackgroundImage className='footer-img' src={addImg}></BackgroundImage></Link>
      <Link to='/analytics'><BackgroundImage className='footer-img' src={analyticsImg}></BackgroundImage></Link>
     { reduxData.artistName?<Link to={`/${reduxData.artistName}`}><BackgroundImage className='footer-img' src={profileImg}></BackgroundImage></Link>:
      <Link to={`/onboarding`}><BackgroundImage className='footer-img' src={profileImg}></BackgroundImage></Link>
     }
    </div>
   </>
  )
}

export default Footer
