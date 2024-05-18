
import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Axios from "./AxiosConfig/Axios";

import Analytics from "./Components/Analytics";
import Forbidden from "./Components/Forbidden";
import ForgetPassword from "./Components/ForgetPassword";

import InputImage from "./Components/InputImage";
import LinkPut from "./Components/LinkPut";
import Onboarding from "./Components/Onboarding";
import Payment from "./Components/Payment";
import PlayMusic from "./Components/PlayMusic";
import Profile from "./Components/Profile";
import Services from "./Components/Services";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import UpdateSong from "./Components/UpdateSong";
// import { Redirect } from 'react-router'

// import Redirect from 'react-router-dom'
// redux 
function App() {
  let [authUser,setAuthUser]=useState(true);
  const authUserData=useSelector((store)=>store.AuthReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    isLoginRender();
  },[])
  const isLoginRender=async()=>{
    let token=localStorage.getItem('token')
    let user=localStorage.getItem('user')
    if(token && user){
      let userData=JSON.parse(user)
        try{
          const {data} = await Axios({
            method:'GET',
            url:'/getUserById/'+userData._id,
            headers:{'Content-Type': 'application/json','token':token,'usertype':'user'}
          })
          let {success,user} = data;
          if(success){
           userData=user;
          userData.token=token
          dispatch({type:'MAKEPREAUTH',payload:userData})
          }else{
          userData.token=token
          dispatch({type:'MAKEPREAUTH',payload:userData})
          }
        }catch(err){
          console.log({err})
        }
    }
    setAuthUser(false)
  }
  return (
    authUser?<div><LoadingOverlay visible={true} overlayBlur={1} /></div>:authUserData.isLogin===true&&authUserData.data.isPaid===true?

      <Router>
        <Routes>
          <Route path="/" element={authUserData.data.artistName!==undefined&&authUserData.data.artistName!=="undefined"?<Navigate to={`/${authUserData.data.artistName}`} />:<Onboarding/>}></Route>
          <Route path="/onboarding" element={<Onboarding/>}></Route>
          <Route path="/LinkPut" element={<LinkPut/>}></Route>
          <Route path="*" element={<Navigate to={'/'} />}></Route>
          <Route path="/updateSong/:id" element={<UpdateSong/>}></Route>
          <Route path="/inputImage/:id" element={<InputImage/>}></Route>
          <Route path="/:username/:songTitle" element={<PlayMusic/>}></Route>
          <Route path="/:username" element={ <Profile />}></Route>
          <Route path="artist/:username" element={ <Profile />}></Route>
          <Route path="/admin" element={ authUserData.data.isAdmin?<Services />:<Navigate to={'/'} />}></Route>
          <Route path="/analytics" element={ <Analytics />}></Route>
          <Route path="/forbidden" element={ <Forbidden />}></Route>
        </Routes>
      </Router>
      :

    <Router>
      <Routes>
        <Route path="/" element={authUserData?.isLogin===true?<Navigate to={'/payment'} />:<Signin/>}></Route>
        <Route path="*" element={<Navigate to={'/'} />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/payment" element={ <Payment />}></Route>
        <Route path="/ForgetPassword" element={ <ForgetPassword/>}></Route>
        <Route path="artist/:username" element={ <Profile />}></Route>
        <Route path="/:username" element={ <Profile />}></Route>
        <Route path="/:username/:songTitle" element={<PlayMusic/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
