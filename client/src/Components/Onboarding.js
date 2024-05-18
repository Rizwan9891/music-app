import React, { useState } from 'react'
import './Css/Onboarding.css'
import image from './assests/no-image-available-icon-ui-260nw-1458092489-removebg-preview.png'
import { useNavigate } from 'react-router-dom';
import Axios from '../AxiosConfig/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOverlay } from '@mantine/core';
// import { BackgroundImage } from '@mantine/core'
function Onboarding() {
  const [file, setFile] = useState(image);
  const [artistName, setName] = useState('');
  const [instaId, setInstaId] = useState('');
  const [loading,setLoading]=useState(false);
  const reduxData=useSelector((state) => state.AuthReducer.data)
  const navigate = useNavigate()
  const dispatch=useDispatch();
  function handleChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result)
    };

  }
  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (artistName.trim().length === 0) {
  //       alert('Please enter name')
  //       return;
  //     }
  //     var formData = new FormData();
  //     formData.append('id',reduxData._id );
  //     formData.append('artistName',artistName);
  //     formData.append('instaId',instaId);
  //     formData.append('image',file);
  //     const { data } = await Axios({
  //       method: 'POST',
  //       url: '/user/onboarding',
  //       headers:{'Content-Type': 'multipart/form-data','token':reduxData.token,'usertype':'user'},
  //       data: formData
  //     })
  //     const { success } = data;
  //     navigate(`/${artistName}`)
  //   } catch (err) {
  //     console.log(err)
  //     alert(err.response.data.message)
  //   }
  // }
  const handleSubmit = async(e) =>{
    try{
     e.preventDefault();
      if (artistName.trim().length === 0) {
        alert('Please enter name')
        return;
      }
      setLoading(true)
     const id = localStorage.getItem('user-id')
     console.log("reduxData.token",reduxData.token)
     console.log("Onboarding Data",{
      id,
      name:artistName,
      instaId,
      image:file
    })
     const {data} = await Axios({
       method:'POST',
       url:'user/onboarding',
       headers:{'Content-Type': 'application/json','token':reduxData.token,'usertype':'user'},
       data:{
         id,
         name:artistName,
         instaId,
         image:file
       }
     })
     const {user} = data;
     let userData=user;
     userData.token=reduxData.token;
     const { success } = data;
     if(success){
      setLoading(false)
      dispatch({type:'SIGNUP',payload:userData})
      navigate(`/${user.artistName}`)
     }
    }catch(err){
      setLoading(false)
     console.log(err)
     alert(err.response.data.message)
    }
   }
  return (
    <>
      <div className='onboardingpage'>
        <form className='obbox' onSubmit={handleSubmit}>
          <h1>ONBOARDING PAGE</h1>
          <div className='onboard'>
            <div className='onboard1'>
              <img src={file} alt="" />
              <input type="file" id="img" onChange={(e) => handleChange(e)} style={{ display: "none" }} />
              <label className='uploadPhoto' for="img">Upload Photo (optional)</label>
            </div>
            <div className='onboard2'>
              <input className='onboardinginputshift' type="text" placeholder='Your Artist Name' value={artistName} onChange={(e) => setName(e.target.value)} />
              <input className='onboardinginputshift' type="text" placeholder='Your Instagram Profile (optional)' value={instaId} onChange={(e) => setInstaId(e.target.value)} />
              <button type='submit'>Proceed</button>
            </div>
          </div>
        </form>
      </div>
      <LoadingOverlay visible={loading} overlayBlur={1} />
    </>
  )
}

export default Onboarding
