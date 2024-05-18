import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, Select, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import { addUrl } from "../fileIndex";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Axios from "../AxiosConfig/Axios";

const UpdateSong = () => {
  const [loader,setLoader] = useState(false); 
  const [URLs, setURLs] = useState([]);
  const [filterServices,setFilterServices] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if(id){
      getSongDetails()
    }
  }, []);
 const getSongDetails = async () =>{
  try{
      const {data} = await Axios({
        method:'GET',
        url:`/song/getSongToUpdate/${id}`
      })
      const {newServices} = data;
      setURLs(newServices);
      setFilterServices(newServices)
  }catch(err){
    console.log({err})
    navigate('/')
  }
 }

  const deleteService = async (index) =>{
   let urls = filterServices.filter((item,i) => i!==index);
   setFilterServices(urls);
  }
  const addSong = async ()=>{
    try{
        setLoader(true)
        const {data} = await Axios({
          method:'POST',
          url:`/song/updateSongUrl/${id}`,
          data:{
            url:filterServices
          }
        })
        const {song} = data;
        setLoader(false);
        navigate(`/inputImage/${song._id}`);
    }catch(err){
        setLoader(false)
        console.log({err})
    }
  }
  const addUrl = (e,index) =>{
    const image_url = filterServices[index].image_url;
    const name = filterServices[index].name;
    const song_url = e.target.value;
    let urlArray = filterServices;
    urlArray[index]= {image_url,song_url,name};
    setFilterServices([...urlArray])
  }
  const onFilterServices = (value) => {
    if(value === ''){
     setFilterServices(URLs);
     return;
    }
    const filteredServices =  URLs.filter((service) => service.name.toLowerCase().startsWith(value.toLowerCase()));
    setFilterServices(filteredServices);
 }
 
  return (
    <div className="service-page">
      <Group>
      <Select
      placeholder="search services"
      searchable
      data={[]}
      onSearchChange={(value) => onFilterServices(value)}
    />
        <Button
          onClick={() => addSong()}
          variant="dark"
          color="green.7"
          fullWidth
          mt="md"
          radius="md"
          style={{ width: "20vmin", margin: "auto" }}
        >
          Next
        </Button>
      </Group>
      <div className="service">
        {filterServices.length >= 0 ? (
           filterServices.map((serviceInfo,index) =>
           index < 4 &&
            <Card
            key={index}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="service-card"
          >
            <CardSection className="card-section-image">
            <BackgroundImage className="service-logo"
                src={serviceInfo.image_url}
                radius="sm"
            ></BackgroundImage>
            <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(index)} color="red.8" variant="light">
              Delete
            </Image>
            </CardSection>
            <TextInput value={filterServices[index].song_url} onChange= {(e)=> addUrl(e,index)} className="service-card-input" placeholder="Enter url here" />
          </Card>
           )
        ) : (
          <></>
        )}
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
        <Footer/>
    </div>
  );
};

export default UpdateSong;
