import { BackgroundImage, Card, Modal, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import './Css/Analytics.css'
import editAnalytics from './assests/editAnalytics.jpeg'
import analytics from './assests/analytics.jpeg'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Axios from '../AxiosConfig/Axios'
const Analytics = () => {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [month, setMonth] = useState('january');
  const [clicks, setClicks] = useState(0);
  const [showPage,setShowPage] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    getSongs();
  }, []);
  const getSongs = async() =>{
    try{
      const user_id = localStorage.getItem('user-id')
      const {data} = await Axios({
        method:'POST',
        url:'song/getSongs',
        data:{
          user_id
        }
      })
      const {songs} = data;
      setSongs(songs)
    }catch(err){
      console.log("analytics err",err);
    }
  }
  const getGraph = (clicks) =>{
    setOpenUser(true);
    setClicks(clicks);
   
  }
  const changeMonth = (e) =>{
      setMonth(e.target.value)
  }
  const getClicksByMonth = async(song_id) => {
    try{
      var res = await Axios({ methos:'GET',url:`song/getClicksByMonth/1/${song_id}`})
         console.log({res})
    }catch(err){
      console.log({err})
    }
  } 
  useEffect(() => {
    // isLoggedIn();
  }, []);
  const isLoggedIn = async() =>{
    try{
      await Axios({
        method:'GET',
        url:'/user/isLoggedIn'
      })
      setShowPage(true)
    }catch(err){
      console.log("isLoggedIn error: ", err)
      // navigate('/');
    }
  }
  return (
   <>
    {
      
        <div className="analytics-page">
        {
         songs.map((song,index)=>{
             return <Card key={index} withBorder className='analytics-card'>
             <div className="upper-card-analytics">
                <BackgroundImage className='analytics-image' src={song?.image?.secure_url}>
    
                </BackgroundImage>
                <div></div>
                <div className="analytics-card-left">
                <Title order={3} >Clicks</Title>
                <Title order={3}>{song.clicked}</Title>
                </div>
             </div>
             <div className='lower-card-analytics'>
                <BackgroundImage className='lower-card-analytics-image' onClick={() => getGraph(song.clicked)} src={analytics}></BackgroundImage>
                <div></div>
                <BackgroundImage className='lower-card-analytics-image' src={editAnalytics} onClick={()=> navigate(`/updateSong/${song._id}`)}></BackgroundImage>
             </div>
            </Card>
         })
        }
          <Modal
         opened={open}
         onClose={() => setOpen(false)}
       >
       </Modal>
       <Modal  size={1000} opened={openUser} onClose={() => setOpenUser(false)}>
           <div className='graphbox'>
           <select class="monthsdiv" onChange={changeMonth}>
           <option value="january">January</option>
           <option value="feb">February</option>
           <option value="march">March</option>
           <option value="april">April</option>
           <option value="may">May</option>
           <option value="june">June</option>
           <option value="july">July</option>
           <option value="august">August</option>
           <option value="september">September</option>
           <option value="october">October</option>
           <option value="november">November</option>
           <option value="december">December</option>
        </select>
 
        <div className='countrydiv'>
             <h1>Country</h1>
             <p><div>India:</div> <div>{month === 'january'? clicks : "0"}</div></p>
             {/* <p><div>Pakistan:</div> <div>50</div></p>
             <p><div>Australia:</div> <div>50</div></p>
             <p><div>USA:</div> <div>50</div></p>
             <p><div>Portugal:</div> <div>50</div></p>
             <p><div>Japan:</div> <div>50</div></p>
             <p><div>Thailand:</div> <div>50</div></p>
             <p><div>Singapore:</div> <div>50</div></p>
             <p><div>Italy:</div> <div>50</div></p>
             <p><div>New Zealand:</div> <div>50</div></p>
             <p><div>Spain:</div> <div>50</div></p>
             <p><div>Netherlands:</div> <div>50</div></p>
             <p><div>Ireland:</div> <div>50</div></p>
             <p><div>Sri Lanka:</div> <div>50</div></p>
             <p><div>South Africa:</div> <div>50</div></p>
             <p><div>Australia:</div> <div>50</div></p>
             <p><div>Malaysia:</div> <div>50</div></p>
             <p><div>Germany:</div> <div>50</div></p>
             <p><div>Indonesia:</div> <div>50</div></p>
             <p><div>Switzerland:</div> <div>50</div></p>
             <p><div>Canada:</div> <div>50</div></p>
             <p><div>China:</div> <div>50</div></p> */}
        </div>
         
        <div className='clicksdiv'>
             <h1>Total Clicks</h1>
              <div><h2>{month === 'january'? clicks : "0"}</h2></div>
        </div>
       
           </div>
       </Modal>
         <Footer />
     </div>
    }
   </>
  )
}

export default Analytics
