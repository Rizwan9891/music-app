import { BackgroundImage, Button, Card, CardSection, FileInput, Group, Image, LoadingOverlay, Modal, Select, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "./Css/Service.css";
import deleteIcon from './assests/deleteIcon.png'
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Axios from "../AxiosConfig/Axios";

const LinkPut = () => {
  const [service, setService] = useState([]);
  const [filterServices,setFilterServices] = useState([]);
  const [loader,setLoader] = useState(false); 
  const [URLs, setURLs] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('useEffect');
    // isLoggedIn();
    getService();
  }, []);
  const getService = async () => {
    try {
        setLoader(true);
      const {data} = await Axios({
        methos:'GET',
        url:'/service/getService',
      })
      const { services } = data;
      setService(services);
      setFilterServices(services)
      let urlArray = [];
      await services.forEach((s,index)=>{
        urlArray = [...urlArray, {...s,secure_url:s.secure_url,song_url:'',service_id:s._id,name:s.name}]
      })
      await setURLs(urlArray);
      setFilterServices(urlArray)
      setLoader(false);
     } catch (err) {
      console.log({ err });
      navigate('/')
      setLoader(false)
    }
  };
  const deleteService = async (index) =>{
   let arr = service.filter((item,i) => i!==index);
   let urls = URLs.filter((item,i) => i!==index);
   setService(arr);
   setFilterServices(arr);
   setURLs(urls);
  }

  const addSong = async ()=>{
    let enterUrls = await [...filterServices.filter((url) => url?.song_url.length > 0)]
    if(enterUrls.length === 0){
      alert('please enter song url in atleast one sevice')
      return;
    }
    try{
        const id = localStorage.getItem('user-id');
        console.log("addSong",{
          "url":enterUrls,
          "user_id":id
        })
        setLoader(true)
        const {data} = await Axios({
          method:'POST',
          url:'/song/addSong',
          data:{
            // url:enterUrls,
            url:enterUrls,
            user_id:id
          }
        })
       
        const {song} = data;
        setLoader(false);
        navigate(`/inputImage/${song._id}`);
    }catch(err){
        setLoader(false)
        console.log(err);
    }
  }
  const addUrl = (e,index) =>{
    const secure_url = filterServices[index].secure_url;
    const name = filterServices[index].name;
    const service_id = filterServices[index]._id;
    const song_url = e.target.value;
    let urlArray = URLs;
    urlArray[index]= {secure_url,song_url,name,service_id};
     setFilterServices([...urlArray])
  }
 
  const onFilterServices = (value) => {
     if(value == ''){
      setFilterServices(service);
      return;
     }
     console.log(service,'ss')
     const filteredServices =  service.filter((service) => service.name.toLowerCase().startsWith(value.toLowerCase()));
     console.log(filterServices,'ff')
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
          withAsterisk
        >
          Next
        </Button>
      </Group>
      <div className="service">
        {
           filterServices?.map((serviceInfo,index) =>
            // index < 4 &&
            // (
              <Card
              key={index}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              className="service-card"
            >
              <CardSection  className="card-section-image">
              <BackgroundImage className="service-logo"
                  src={serviceInfo.secure_url}
                  radius="sm"
              ></BackgroundImage>
              <Image style={{cursor:'pointer'}} height={30} width={30} src={deleteIcon} onClick={()=> deleteService(index)} color="red.8" variant="light">
                Delete
              </Image>
              </CardSection>
              <TextInput withAsterisk required={true} value={filterServices[index].url} onChange= {(e)=> addUrl(e,index)} className="service-card-input" placeholder="Enter url here" />
            </Card>
            )
          //  )
        // ) : (
        //   <>
        //   </>
        }
        <LoadingOverlay visible={loader} overlayBlur={1} />
      </div>
        <Footer/>
    </div>
  );
};

export default LinkPut;
