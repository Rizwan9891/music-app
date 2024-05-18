import { LoadingOverlay } from '@mantine/core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../AxiosConfig/Axios';
import './Css/Signup.css'

function ForgetPassword() {
  const [isMailSend,setIsMailSend]=useState(true)
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [OTP,setOTP]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()
  const signInAPI =  async (e) =>{
    e.preventDefault();
    setLoading(true)
    try{
      const {data} = await Axios({
        method:'POST',
        url:'/forgotPassword',
        data:{
          email
        }
      })
      let {success} = data;
      if(success){
        setIsMailSend(false)
        setLoading(false)
      }
    }catch(err){
      setLoading(false)
      const {message} = err.response?.data;
      console.log({err})
      alert(message)
    }
  }
  const resetPassword =  async (e) =>{
    e.preventDefault();
    if (!checkPassword(password)) return;
    setLoading(true)
    try{
      const {data} = await Axios({
        method:'POST',
        url:'/resetPassword',
        data:{
          email,
          OTP,
          password
        }
      })
      let {success} = data;
      console.log(data,'data....')
      if(success){
        setLoading(false)
        navigate('/');
      }
    }catch(err){
      setLoading(false)
      const {message} = err.response?.data;
      console.log({err})
      alert(message)
    }
  }
  const checkPassword = (inputtxt) => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongRegex.test(inputtxt)) {
      alert(
        "please enter valid password with , one uppercase, one lowercase , one special symbol and minimum 8 characters"
      );
      return false;
    }
    if (password !== confirmPassword) {
      alert("password and confirm password should match");
      return false;
    }
    return true;
  };
  return (
    <>
    {isMailSend?<div className='sign'>
         <div>
         <form className='signupbox in' onSubmit={(e) => signInAPI(e)}>
              <h1>Forget Password</h1>
             <div className='inputLogin'>
             <input type="text" placeholder='Email ID' value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </div>
              <button>Forget Password</button>
          </form>
         </div>
    </div>:
    <div className='sign'>
         <div>
         <form className='signupbox in' onSubmit={(e) => resetPassword(e)}>
              <h1>Set New Password</h1>
             <div className='inputLogin'>
             <input type="text" placeholder='New Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
             <input type="text" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
             <input type="text" placeholder='OTP' value={OTP} onChange={(e)=> setOTP(e.target.value)}/>
             </div>
              <button>Set New Password</button>
          </form>
         </div>
    </div>}
    <LoadingOverlay visible={loading} overlayBlur={1} />
    </>
  )
}

export default ForgetPassword
