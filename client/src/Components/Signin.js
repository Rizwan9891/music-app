import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from '../AxiosConfig/Axios';
import './Css/Signup.css'
import { LoadingOverlay } from '@mantine/core';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();

  const signInAPI =  async (e) =>{
    setLoading(true)
    e.preventDefault();
    try{
      const {data} = await Axios({
        method:'POST',
        url:'/signIn',
        data:{
          email,
          password
        }
      })
      let {success,user,token} = data;
      if(success){
        localStorage.setItem("user-id", user._id);
        localStorage.setItem("artist-name", user.artistName);
        localStorage.setItem("username",user.email);
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
        let userData=user
        userData.token=token
        dispatch({type:'SIGNIN',payload:userData})
        setLoading(false)
      }
    }catch(err){
      setLoading(false)
      const {message} = err.response?.data;
      console.log({err})
      alert(message)
    }
  }
  return (
    <>
    <div className='sign'>
         <div>
         <form className='signupbox in' onSubmit={(e) => signInAPI(e)}>
              <h1>LOGIN PAGE</h1>
             <div className='inputLogin'>
             <input type="text" placeholder='Email ID' value={email} onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </div>
              <button>LOG IN</button>
          </form>
          <Link className='link' to="/signup">Sign Up</Link>
          <Link className='link' to="/ForgetPassword">Forget Password</Link>
         </div>
    </div>
    <LoadingOverlay visible={loading} overlayBlur={1} />
    </>
  )
}

export default Signin
