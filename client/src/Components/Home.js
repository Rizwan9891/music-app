import React from 'react'
import './Css/Home.css'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import Footer from './Footer'


function Home() {

  return (
    <>
    <div className='home'>
        <Navbar/>
         <div className='centerBox'>
            <h1>Free music links <br />to all platforms</h1>
            <p>In one click Songwhip finds your music <br /> everywhere & makes a page you can share with <br /> everyone</p>
           <button><Link className='LinkPutlink' to="/LinkPut">MAKE A MUSIC LINK &rarr;</Link></button>
         </div>
         <Footer/>
    </div>
    </>
  )
}

export default Home
