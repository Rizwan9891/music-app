import { BackgroundImage } from "@mantine/core";
import React from "react";
import './/Css/Responsive.css';




// const Immuwork = (data) => { 
//     return (
//         <>
//             {data?.data.length > 0 ?
//                 <div className="wrapper">
//                     <div className="Box1">
//                         {data.data.map((service, index) => {
//                             if (service.song_url.trim()) {
//                                 return <>
//                                     <div className="playmusic-service-card" key={index}>
//                                         <BackgroundImage className='playmusic-service' src={`${service.image_url}`} radius="sm" >
//                                         </BackgroundImage>
//                                         <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
//                                     </div>
//                                 </>
//                             }
//                             else {
//                                 return <></>
//                             }
//                         })}
//                     </div>
//                 </div> :
//                 null}
//         </>
//     )
// }


// export default Immuwork

const Immuwork = (data) => {
    return (
      <>
        {data?.data.length > 0 ? (
          <div className="wrapper">
            <div className="Box1">
              {data.data.map((service, index) => {
                if (service.song_url.trim()) {
                  return (
                    <div
                      className="playmusic-service-card"
                      key={index}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 10px)",
                        margin: "10px",
                        "@media (max-width: 767px)": {
                          display: "block",
                          width: "100%",
                          margin: "0",
                        },
                      }}
                    >
                      <BackgroundImage
                        className="playmusic-service"
                        src={`${service.image_url}`}
                        radius="sm"
                      ></BackgroundImage>
                      <a href={service.song_url} target="_blank">
                        <button className="play-btn">Play</button>
                      </a>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        ) : null}
      </>
    );
  };
  
  export default Immuwork;
  