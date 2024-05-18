import React, { useEffect, useRef, useState } from 'react'
import './Css/PlayMusic.css'
import insta from './assests/icons8-instagram-26.png'
import instagram from './assests/Insta-1.webp'
import youtubemusic from './assests/yt_edited.webp'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/wp.webp'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BackgroundImage } from '@mantine/core'
import Footer from './Footer'
import Axios from '../AxiosConfig/Axios'

function PlayMusic() {
    const [song, setSong] = useState(null);
    const [showPage, setShowPage] = useState(false)
    const [youtubeLink, setYoutubeLink] = useState('');
    const [youtubemusicLink, setyoutubemusicLink] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        getSongDetails();
    }, []);
    const { username, songTitle } = useParams();
    const getSongDetails = async () => {
        try {
            const { data } = await Axios({
                method: 'POST',
                url: '/song/getSongDetails',
                data: {
                    username, songTitle
                }
            })
            const { song } = data;
            console.log(song, '..')
            song.socialUrl.map((link) => {
                if (link?.name?.toLowerCase() === 'youtube') {
                    setYoutubeLink(link.song_url);
                }
                if (link?.name?.toLowerCase() == 'music')
                    setyoutubemusicLink(link.song_url)
            })
            if (Object.keys(song).length === 0) {
                navigate('/')
            }
            setSong(song)
            setShowPage(true);
        } catch (err) {
            console.log({ err })

        }
    }

    return (
        <>
            {
                showPage && (
                    <>
                        {
                            song && (
                                <>
                                    <div className='SongPage'>
                                        <div className='nav'>
                                            <div></div>
                                            <h2>ONE BACKLINK</h2>
                                            <div></div>
                                        </div>
                                        <div className='section'>
                                            <div class="container" >
                                                <div className='row mb-5'>
                                                    <div className='col-md-1'></div>
                                                    <div className='col-md-5 col-12'>                                                       
                                                        <div className='pvmain'>
                                                            <div className='imgbox'>
                                                                <BackgroundImage className='photo-centre' src={song?.image?.secure_url} >
                                                                    <div>
                                                                        <img className='banner' src={song?.image?.secure_url} alt="" />
                                                                    </div>
                                                                </BackgroundImage>
                                                            </div>
                                                            <div className='d-md-block d-none text-center' style={{ marginTop: 80 }}>
                                                                <h1>{song?.songTitle}</h1>
                                                                <p>{username.replace('-', ' ')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-5 col-12'>
                                                        <div className='pm21 pb-2 d-md-flex d-none align-items-center'>
                                                            <p className='mb-0'>{username.replace('-', ' ')}</p>
                                                            <a href={`${song?.instaId}`} target="_blank"><img style={{ height: 30 }} src={insta} alt="" /></a>
                                                            </div>
                                                        {youtubeLink.length > 0 && (
                                                            <div className={`vedio vedio-border`}>
                                                                <iframe className='bord' width="100%" height="250" src={`https://www.youtube.com/embed/${youtubeLink.split("/").pop()}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                                            </div>                                                          
                                                            )}
                                                            {youtubeLink.length === 0 && (
                                                                <div className='blank-box'>
                                                                </div>
                                                            )}
                                                        <div className='pm23 mt-5 d-md-flex d-none mb-5'>
                                                                <div>
                                                                <img style={{ maxWidth: 150 }} src={youtubemusic} alt="" />
                                                                </div>
                                                            <a href={youtubemusicLink} target='_blank'><button className='btn btn-primary button'>Play</button></a>
                                                            </div>
                                                            {youtubeLink.length === 0 && (
                                                                <>
                                                                    <div className='blank-box'>
                                                                    </div>
                                                                    <div className='blank-box'>
                                                                    </div>
                                                                </>
                                                            )}
                                                        <div className='d-md-none d-block text-center mt-5 mb-5'>
                                                            <h1 className='text-capitalize mb-3'>{song?.songTitle}</h1>
                                                            <h2 className='text-capitalize'>{username.replace('-', ' ')}</h2>
                                                        </div>                                                                                                         
                                                    </div>
                                                    <div className='col-md-1'></div>
                                                </div>
                                            </div>
                                            {song ?
                                                <div className='AppArea'>
                                                    <div className='left-services'>
                                                        {
                                                            song.socialUrl.map((service, index) => {
                                                                if (index < song.socialUrl.length / 2)
                                                                    return <div key={index} className='playmusic-service-card'>
                                                                        <img className='playmusic-service-image' src={`${service.secure_url}`} ></img>
                                                                        <a href={service.song_url} target='_blank'><button className='btn btn-primary button'>Play</button></a>
                                                                    </div>
                                                                else {
                                                                    return <></>
                                                                }
                                                            })
                                                        }
                                                    </div>                                                    
                                                    <div className="right-services">
                                                        {
                                                            song.socialUrl.map((service, index) => {
                                                                if (index >= song.socialUrl.length / 2)
                                                                    return <div key={index} className='playmusic-service-card'>
                                                                        <img className='playmusic-service-image' src={`${service.secure_url}`} />
                                                                        <a href={service.song_url} target='_blank'><button className='btn btn-primary button'>Play</button></a>
                                                                    </div>
                                                                else {
                                                                    return <></>
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                : <></>
                                        }
                                            <div className='lastOne'>
                                                <p className='p'>POWERED BY</p>
                                                <div className='onewali'>
                                                    <span>ONE</span>
                                                    <p>MUSIC RECORDS</p>
                                                </div>
                                                <p className='d'>Digitally Distributed By One Music Records Distribution</p>
                                                <div className='twowali'>
                                                    <a href="https://www.onemusicrecordsofficial.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsofficial.com</p></a>
                                                    <a href="https://www.onemusicrecordsdistribution.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsdistribution.com</p></a>
                                                </div>
                                                <div className='threewali'>
                                                    <a href="tel:+917021480255" target="_blank">
                                                        <svg data-bbox="30.499 30 139 139.999" viewBox="30.499 30 139 139.999" height="45" width="45" xmlns="http://www.w3.org/2000/svg" data-type="color" role="presentation" aria-hidden="true"><defs>z</defs>
                                                            <g>
                                                                <path d="M154.708 115.415a80.404 80.404 0 0 1-17.641-4.416c-6.242-2.359-13.345-.836-18.104 3.896l-6.198 6.229a101.805 101.805 0 0 1-33.919-34.089l6.205-6.237c4.695-4.773 6.21-11.918 3.865-18.193a81.55 81.55 0 0 1-4.401-17.771C83.323 36.349 76.039 30 67.572 30l-.168.001H47.635c-.515 0-1.033.023-1.53.07-4.561.414-8.69 2.589-11.625 6.125-2.937 3.538-4.326 8.015-3.908 12.667C32.79 69.86 40 90.325 51.401 108.016c10.361 16.39 24.455 30.558 40.73 40.953 17.546 11.437 37.809 18.683 58.672 20.961.515.046 1.031.069 1.534.069h.077c9.456-.039 17.118-7.808 17.081-17.302v-19.825c.19-8.733-6.144-16.231-14.787-17.457zm6.845 17.412v19.887c.02 5.1-4.094 9.265-9.173 9.286-.294-.002-.58-.012-.793-.03-19.563-2.137-38.629-8.955-55.17-19.736-15.327-9.79-28.576-23.108-38.334-38.543C47.34 87.021 40.557 67.769 38.477 48.08a9.218 9.218 0 0 1 2.098-6.752 9.138 9.138 0 0 1 7.06-3.326h19.808c.032-.002.062-.002.092-.002 4.566 0 8.476 3.404 9.111 7.918a89.669 89.669 0 0 0 4.834 19.497c1.259 3.366.445 7.194-2.055 9.736l-8.369 8.412a4.022 4.022 0 0 0-.646 4.812c9.73 17.199 23.917 31.461 41.028 41.241a3.948 3.948 0 0 0 4.766-.647l8.353-8.396a9.212 9.212 0 0 1 9.728-2.08 88.214 88.214 0 0 0 19.35 4.85c4.63.656 8.034 4.691 7.918 9.386v.098z" fill="#000001" data-color="1"></path>
                                                            </g>
                                                        </svg>
                                                    </a>
                                                    <a href="https://www.instagram.com/onemusicrecordsofficial/" target="_blank"><img style={{ maxWidth: 50, marginLeft: 35 }} src={instagram} alt="" /></a>
                                                    <a href="https://api.whatsapp.com/message/CYNLOEAFI5GGP1?autoload=1&app_absent=0" target="_blank"><img style={{ maxWidth: 50, }} src={whatsapp} alt="" /></a>
                                                </div>
                                            </div>
                                        </div>  



                                        {/* <div className='photovideo'>
                                            <div className='pv1'>
                                                <div className='pvspace'></div>

                                                <div className='pvmain'>
                                                    <div className='imgbox'>
                                                        <BackgroundImage className='photo-centre' src={song?.image?.secure_url} >
                                                            <img style={{ width: "40vmin", height: '40vmin' }} src={song?.image?.secure_url} alt="" />
                                                        </BackgroundImage>

                                                    </div>
                                                    <h1>{song?.songTitle}</h1>
                                                    <p>{username}</p>
                                                </div>
                                            </div>
                                            <div className='pv2'>
                                                <div className='pvmain2'>
                                                    <div className='pm21'>
                                                        <p>{username}</p>
                                                        <a href={`${song?.instaId}`} target="_blank"><img style={{ height: "3.8vmin" }} src={insta} alt="" /></a>
                                                    </div>
                                                    {youtubeLink.length > 0 && (
                                                        <div className='pm22 pm22-border'>
                                                            <iframe id='youtube-iframe' width="440" height="220" src={`https://www.youtube.com/embed/${youtubeLink.split("/").pop()}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                        </div>
                                                    )}
                                                    {youtubeLink.length === 0 && (
                                                        <div className='blank-box'>
                                                        </div>
                                                    )}
                                                    <div className='pm23'>
                                                        <div>
                                                            <img style={{ height: "15vmin" }} src={youtubemusic} alt="" />
                                                            <h1>Music</h1>
                                                        </div>
                                                        <a href={youtubemusicLink} target='_blank'><button className='play-btn'>Play</button></a>
                                                    </div>
                                                    {youtubeLink.length === 0 && (
                                                        <>
                                                            <div className='blank-box'>
                                                            </div>
                                                            <div className='blank-box'>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className='pvspace'></div>
                                            </div>
                                        </div> */}
                                        {/* {song ?
                                                <div className='AppArea'>
                                                    <div className='aa1 right-service'>
                                                        {
                                                            song.socialUrl.map((service, index) => {
                                                                if (index < song.socialUrl.length / 2)
                                                                    return <div key={index} className='playmusic-service-card'>
                                                                        <BackgroundImage className='playmusic-service'
                                                                            src={`${service.secure_url}`}
                                                                            radius="sm"
                                                                        >
                                                                        </BackgroundImage>
                                                                        <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
                                                                    </div>
                                                                else {
                                                                    return <></>
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                    <div className='service-line'></div>
                                                    <div className="aa1">
                                                        {
                                                            song.socialUrl.map((service, index) => {
                                                                if (index >= song.socialUrl.length / 2)
                                                                    return <div key={index} className='playmusic-service-card'>
                                                                        <BackgroundImage className='playmusic-service'
                                                                            src={`${service.secure_url}`}
                                                                            radius="sm"
                                                                        >
                                                                        </BackgroundImage>
                                                                        <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
                                                                    </div>
                                                                else {
                                                                    return <></>
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                : <></>
                                        } */}
                                        {/* <div className='lastOne'>
                                            <p className='p'>POWERED BY</p>
                                            <div className='onewali'>
                                                <span>ONE</span>
                                                <p>MUSIC RECORDS</p>
                                            </div>
                                            <p className='d'>Digitally Distributed By One Music Records Distribution</p>
                                            <div className='twowali'>
                                                <a href="https://www.onemusicrecordsofficial.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsofficial.com</p></a>
                                                <a href="https://www.onemusicrecordsdistribution.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsdistribution.com</p></a>
                                            </div>
                                            <div className='threewali'>
                                                <a href="tel:+917021480255" target="_blank"><img style={{ height: "8vmin" }} src={phone} alt="" /></a>
                                                <a href="https://www.instagram.com/onemusicrecordsofficial/" target="_blank"><img style={{ height: "10vmin" }} src={instagram} alt="" /></a>
                                                <a href="https://api.whatsapp.com/message/CYNLOEAFI5GGP1?autoload=1&app_absent=0" target="_blank"><img style={{ height: "10vmin" }} src={whatsapp} alt="" /></a>
                                            </div>
                                        </div> */}
                                    </div>
                                    <Footer />
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default PlayMusic
