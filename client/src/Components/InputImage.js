import React, { useEffect } from "react";
import "./Css/InputPage.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "./assests/no-image-available-icon-ui-260nw-1458092489-removebg-preview.png";
import { useSelector, useDispatch } from "react-redux";
import { addDetails } from "../fileIndex";
import {
  BackgroundImage,
  Button,
  Card,
  CardSection,
  LoadingOverlay,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Axios from "../AxiosConfig/Axios";


function InputImage() {
  const [file, setFile] = useState(image);
  const [existingFile, setExistingFile] = useState('');
  const [loader, setLoader] = useState(false);
  const [songTitle, setSongTitle] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [artistName, setArtistName] = useState('');
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.AuthReducer.data)
  const {id} = useParams();
  function handleChange(e) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result)
    };
  }
  useEffect(() => {
    getSongById();
    getUserInstaId();
  }, []);
  const getSongById = async() => {
    try{
      const {data} = await Axios({
        method:'GET',
        url:`/song/getSongById/${id}`
      });
      const {image,songTitle} = data.song;
      setExistingFile(image.secure_url)
      setSongTitle(songTitle)
    }catch(err){
      console.log({err});
    }
  }
  const getUserInstaId = async() =>{
    try{
      setLoader(true);
      const user_id = localStorage.getItem('user-id');
      const {data} = await Axios({
        method:'GET',
        url:`/getUserById/${user_id}`,
        headers: { 'Content-Type': 'application/json', 'token': reduxData.token, 'usertype': 'user' }
      })
      const {user} = data;
      // console.log("getUserInstaId",user);
      setInstagramId(user?.instaId);
      setArtistName(user?.artistName);
      setLoader(false);
    }catch(err){
      console.log({err});
      setLoader(false)
    }
  }
  const validate =  () => {
    if(file === image && existingFile.length === 0){
      alert('please upload image');
      return false;
    }else if(songTitle.length === 0){
      alert('please enter song title');
      return false;
    }else{
      return true;
    }
  }
  const addSongDetails = async() =>{
    const user_id = localStorage.getItem('user-id');
    if(validate()){
      try{
        const myfile = file === image ? '' : file;
        setLoader(true);
        const {data} = await Axios({
          method:'POST',
          url:`/song/addSongCover/${id}`,
          data:{
            image:myfile,
            artistName:artistName,
            songTitle:songTitle.trim(),
            instaId:instagramId.trim(),
            user_id:user_id,
          }
        });
        const {song} = data;
        setLoader(false);
        navigate(`/${artistName}/${song.songTitle.split(" ").join("-").toLowerCase()}`)
      }catch(err){
        console.log({err});
        setLoader(false)
      }
    }
  }
  return (
    <>
      <div className="InputPage">
        <Card
          className="input-image-card"
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
        >
          <Title order={2}>Cover</Title>
          <CardSection className="input-image-photo-section">
            <BackgroundImage
              className="input-image-card-photo"
              src={file === image && existingFile ? existingFile : file}
              radius="sm"
            ></BackgroundImage>
            <input
              onChange={(e)=> handleChange(e)}
              type="file"
              id="img"
              name="file"
              style={{ display: "none" }}
              withAsterisk
            />
            <label className="InputImageLabel" htmlFor="img">Upload Image</label>
          </CardSection>
          <CardSection>
            <div className="input-image-input">
              <Title order={4}>Song Title</Title>
              <TextInput   value={songTitle} onChange={(e) => setSongTitle(e.target.value)} placeholder="Enter song title" />
            </div>
            <div className="input-image-input">
              <Title order={4}>Instagram ID</Title>
              <TextInput withAsterisk value={instagramId} onChange={(e) => setInstagramId(e.target.value)} placeholder="Enter instagram id" />
            </div>
          </CardSection>
          <Button onClick={addSongDetails}>Save</Button>
        </Card>
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
    </>
  );
}

export default InputImage;
