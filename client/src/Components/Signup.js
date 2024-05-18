import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../AxiosConfig/Axios";
import "./Css/Signup.css";
import useGeoLocation from "react-ipgeolocation";
import { useDispatch } from "react-redux";
import { countaryData } from "./assests/countrydata";
import { LoadingOverlay } from "@mantine/core";
// import {countaryData} from '../A'
function Signup() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const location = useGeoLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   console.log("location",location);
  // },[])
  const handleSubmit = async (e) => {
    let country=location.country;
    countaryData.map((data)=> {
      if(data.isoAlpha2==country||data.isoAlpha2==country){
        country=data.name;
        return;
      }
    });
    console.log("handleSubmit",country);
    try {
      if (!validateEmail(email)) return;
      if (!checkPassword(password)) return;
      setLoading(true)
      e.preventDefault();
      const { data } = await Axios({
        method: "POST",
        url: "/signup",
        data: {
          email,
          password,
          country
        },
      });

      const { success, user,token } = data;
      // console.log(success, user,token,'data')
      if (success) {
        localStorage.setItem("user-id", user._id);
        localStorage.setItem("artist-name", user.artistName);
        localStorage.setItem("username",user.email);
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
        let userData=user;
        userData.token=token;
        dispatch({type:'SIGNUP',payload:userData})
        navigate('/')
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log({err});
      alert(err.response.data.message)
    }
  };
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  };
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
      <div className="sign">
        <div>
          <form className="signupbox" onSubmit={(e) => handleSubmit(e)}>
            <h1>SIGN UP PAGE</h1>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button>SIGN UP</button>
          </form>
          <Link className="link" to="/">
            SignIn
          </Link>
        </div>
      </div>
      <LoadingOverlay visible={loading} overlayBlur={1} />
    </>
  );
}

export default Signup;
