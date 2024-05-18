import React, { useEffect, useState } from 'react'
// import './Css/PlayMusic.css'
import './Css/Profile.css'
import instagram from './assests/Insta-1.webp'
import youtube from './assests/icons8-youtube-48.png'
import phone from './assests/icons8-phone-50.png'
import whatsapp from './assests/wp.webp'
import correct from './assests/icons8-correct-48 (2).png'
import { useNavigate, useParams } from 'react-router-dom'
import { BackgroundImage, Button, FileInput, Group, LoadingOverlay, Modal, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import Footer from './Footer'
import Axios from '../AxiosConfig/Axios'
import logo from '../Components/assests/220px-Arjun_Coomaraswamy_-_Summer_2021.jpg'
import { useDispatch, useSelector } from 'react-redux'
import Immuwork from './Immuwork'
function Profile() {
  const [User, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [about, setAbout] = useState('');
  const [profession, setProfession] = useState('');
  const [instaId, setInstaId] = useState('');
  const [service, setService] = useState([]);
  const [url, setUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const [latestSong, setLatestSong] = useState('');
  const [embededUrl, setEmbededUrl] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const reduxData = useSelector((state) => state.AuthReducer.data)
  const [showEdit, setShowEdit] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line
    getUserProfile([]);
    getServices();
  }, []);
  const getServices = async () => {
    try {
      setLoader(true);
      const { data } = await Axios({ method: 'GET', url: 'service/getService' })
      const { services } = data;
      setService(services);
      getUserProfile(services);
      setLoader(false)
    } catch (err) {
      setLoader(false)
      console.log({ err })
    }
  }
  const getUserProfile = async (services) => {
    try {
      console.log(`user/getByArtistName/${username}`);
      if (username == null || username == '' || username == "undefined") {
        navigate('/')
      }
      const { data } = await Axios({ method: 'GET', url: `user/getByArtistName/${username}`, })
      const { user } = data;
      setUser(user);
      let links = user.profileLinks.filter((link) => link.song_url.includes('youtube'));
      if (reduxData.artistName == username) {
        setShowEdit(true)
      } else if (reduxData.artistName !== username) {
        setShowEdit(false)
      }
      // eslint-disable-next-line
      setYoutubeLink(links.length === 0 ? '' : links[0].song_url)
      setEmbededUrl(user.latestSong.trim() ? true : false);
      // eslint-disable-next-line
      // setShowEdit(editable)
      let urlArray = [];
      services.forEach((link) => {
        let flag = true;
        user.profileLinks.forEach((newLink) => {
          if (link.secure_url == newLink.image_url) {
            urlArray = [...urlArray, newLink];
            flag = false;
          }
        })
        if (flag) {
          urlArray = [...urlArray, { image_url: link.secure_url, song_url: '', service_id: link._id }];
        }
      })
      setUrl([...urlArray]);
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result)
    };
  }
  const updateProfile = async () => {
    try {
      const id = localStorage.getItem("user-id");
      console.log({
        image: file,
        about,
        profession,
        instaId,
        id,
        latestSong,
        service: url,
      });
      await Axios({
        method: "POST",
        url: "/updateProfile",
        headers: { 'Content-Type': 'application/json', 'token': reduxData.token, 'usertype': 'user' },
        data: {
          image: file,
          about,
          profession,
          instaId,
          id,
          latestSong,
          service: url,
        },
      });
      getUserProfile(service);
      setOpenModal(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  const openEditForm = () => {
    setInstaId(User.instaId);
    setAbout(User.about);
    setProfession(User.profession);
    setLatestSong(User.latestSong)
    setOpenModal(true)
  }
  const handleProfession = (e) => {
    if (e.target.value.length <= 40)
      setProfession(e.target.value);
  }
  const handleAbout = (e) => {
    if (e.target.value.length <= 250)
      setAbout(e.target.value);
  }
  const handleUrl = (e, index) => {
    const image_url = url[index].image_url;
    const song_url = e.target.value;
    let urlArray = url;
    urlArray[index] = { image_url, song_url };
    setUrl([...urlArray])
  }
  const logout = async () => {
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  };
  return (
    <>
      {
        User ?
          <>
            <div className='profilepage'>
              <div className='nav'>
                <div></div>
                <div>
                  <span>ONE BACKLINK</span>
                </div>
                {
                  showEdit
                    ? (
                      <>
                        <h3 onClick={logout} className='logout'>Log Out</h3>
                        <button className='logout-button'>
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ddd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                          </svg>
                        </button>
                      </>
                    )
                    : <div></div>
                }
              </div>
            </div>
            <Modal className='edit-profile'
              opened={openModal}
              onClose={() => setOpenModal(false)}
              title="Edit Profile"
              centered
            >
              <FileInput onChange={handleChange} label="Change profile" placeholder="upload profile" icon={<IconUpload size={14} />} />
              <TextInput
                label="Profession"
                className='edit-input'
                placeholder='Enter profession'
                value={profession}
                onChange={(e) => handleProfession(e)}
              />
              <TextInput
                className='edit-input'
                label="About"
                placeholder='Enter something about you'
                value={about}
                onChange={(e) => handleAbout(e)}
              />
              <TextInput
                className='edit-input'
                label="Instagram Id"
                placeholder='Enter your instagram id'
                value={instaId}
                onChange={(e) => setInstaId(e.target.value)}
              />
              <TextInput
                className='edit-input'
                label="Latest song on youtube"
                placeholder='Enter your latest song url from youtube'
                value={latestSong}
                onChange={(e) => setLatestSong(e.target.value)}
              />
              {
                url.map((s, index) => {
                  return <Group>
                    <BackgroundImage src={s.image_url} className='profile-service-modal'></BackgroundImage>
                    <TextInput
                      className='edit-input link-input-modal'
                      value={s.song_url}
                      onChange={(e) => handleUrl(e, index)}
                    />
                  </Group>
                })
              }
              <Group className='edit-input'>
                <Button color='teal.7' onClick={updateProfile}>Save</Button>
                <Button color='red.7' onClick={() => setOpenModal(false)}>Cancel</Button>
              </Group>
            </Modal>
            <div className='section'>
              <div class="container" >
                <div className='row justify-content-center'>
                  <div className='col-md-9 col-12'>
                    <div id='noneDesktop'>
                      <div class="row" >
                        <div className='col-md-3 col-12'>
                          <div className='d-md-block d-flex'>
                            <div className='prophoto'>
                              <img src={`${User?.image.secure_url}`} alt="" />
                            </div>
                            <div className='applink d-md-none d-block' id='noneapplink'>
                              <a href={`${User.instaId}`} className='applinkdiv'>
                                <img style={{ objectFit: 'contain' }} src={instagram} alt="" /><span>Instagram</span>
                              </a>
                              <a className='applinkdiv' href={`${youtubeLink}`}>
                                <img style={{ objectFit: 'contain' }} src={youtube} alt="" /><span>Youtube</span>
                              </a>
                            </div>
                          </div>

                        </div>
                        <div class="col-md-9">
                          <div className='proname'>
                            <div className='d-md-flex d-block  align-items-center mb-2'>
                              <p className='name'>{User.name}</p>
                              <img style={{ width: 25, height: 25, marginLeft: 5 }} src={correct} alt="" />
                            </div>
                            {
                              showEdit && (
                                <button style={{ border: 'none', padding: '1vmin', color: 'white', cursor: 'pointer', backgroundColor: '#20a8d0', }} onClick={() => openEditForm()}>Edit Profile</button>
                              )
                            }
                          </div>
                          <p className='job color_14 pt-2'>{User.profession}</p>
                          <p className='discription'>{User.about}</p>
                        </div>
                      </div>
                    </div>
                    <div id='blockMob'>
                      <div class="row" >
                        <div className='col-6'>
                          <div className='prophoto'>
                            <img
                              src={`${User?.image.secure_url}`}
                              alt="" />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='applink'>
                            <a href={`${User.instaId}`} className='applinkdiv'>
                              <img style={{ objectFit: 'contain' }} src={instagram} alt="" /><span>Instagram</span>
                            </a>
                            <a className='applinkdiv' href={`${youtubeLink}`}>
                              <img style={{ objectFit: 'contain' }} src={youtube} alt="" /><span>Youtube</span>
                            </a>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='proname'>
                            <div>
                              <p className='name'>{User.name}</p>
                              <img style={{ marginLeft: "2vmin", marginTop: "-28px" }} src={correct} alt="" />
                              {
                                showEdit && (
                                  <button style={{ border: 'none', padding: '1vmin', color: 'white', cursor: 'pointer', backgroundColor: '#20a8d0', marginTop: '1vmin', marginLeft: "2vmin" }} onClick={() => openEditForm()}>Edit Profile</button>
                                )
                              }

                            </div>
                            <p className='job color_14'>{User.profession}</p>
                            <p className='discription'>{User.about}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row align-items-center">
                      <div class="col-md-6 d-md-block d-none">
                        <div className='applink' id='noneapplink'>
                          <a href={`${User.instaId}`} className='applinkdiv'>
                            <img style={{ objectFit: 'contain' }} src={instagram} alt="" /><span>Instagram</span>
                          </a>
                          <a className='applinkdiv' href={`${youtubeLink}`}>
                            <img style={{ objectFit: 'contain' }} src={youtube} alt="" /><span>Youtube</span>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-5 col-12" >
                        <div className={`${embededUrl ? 'vedio-border' : ''} vedio`}>
                          {
                            embededUrl && (<iframe className='bord' width="100%" height="210" src={`https://www.youtube.com/embed/${User.latestSong.split("/").pop()}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>)
                          }
                        </div>
                      </div>
                    </div>
                    <div style={{ minHeight: 120 }}></div>
                    <div class="row playmusic-service-card-row"
                    // style={{ '--row-item-count': User.profileLinks.length + 2 / User.profileLinks.length }}
                    >
                      {
                        User.profileLinks.map((service, index) => {
                          if (service.song_url.trim()) {
                            return (
                              <div className='col-md-6'>
                                <div className='playmusic-service-card'>
                                  <img src={`${service.image_url}`} className='playmusic-service-image' />
                                  <a href={service.song_url} target='_blank'>
                                    <button type="button" class="btn btn-primary button">Play</button>
                                  </a>
                                </div>
                              </div>
                            )
                          }
                          else {
                            return <></>
                          }
                        })
                      }
                      {/* <div className="vertical"></div>  */}
                    </div>
                    <div className='row'>
                      <div className=' col-lg-12 col-md-12 col-12'>
                        <div className='lastOne1'>
                          <div className='onewali'>
                            <p className='p mb-0'>POWERED BY</p>
                            <span>ONE</span>
                            <p>MUSIC RECORDS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div id='imgb1'>
                          <p className='d text-center'>Digitally Distributed By One Music Records Distribution</p>
                          <div className='twowali'>
                            <a href="https://www.onemusicrecordsofficial.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsofficial.com</p></a>
                            <a href="https://www.onemusicrecordsdistribution.com" target="_blank" style={{ textDecoration: 'none', color: 'rgb(18,175,255)' }}><p>www.onemusicrecordsdistribution.com</p></a>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='threewali' id='imgb'>
                          <a href="tel:+917021480255" target="_blank">
                            <svg data-bbox="30.499 30 139 139.999" viewBox="30.499 30 139 139.999" height="45" width="45" xmlns="http://www.w3.org/2000/svg" data-type="color" role="presentation" aria-hidden="true"><defs>z</defs>
                              <g>
                                <path d="M154.708 115.415a80.404 80.404 0 0 1-17.641-4.416c-6.242-2.359-13.345-.836-18.104 3.896l-6.198 6.229a101.805 101.805 0 0 1-33.919-34.089l6.205-6.237c4.695-4.773 6.21-11.918 3.865-18.193a81.55 81.55 0 0 1-4.401-17.771C83.323 36.349 76.039 30 67.572 30l-.168.001H47.635c-.515 0-1.033.023-1.53.07-4.561.414-8.69 2.589-11.625 6.125-2.937 3.538-4.326 8.015-3.908 12.667C32.79 69.86 40 90.325 51.401 108.016c10.361 16.39 24.455 30.558 40.73 40.953 17.546 11.437 37.809 18.683 58.672 20.961.515.046 1.031.069 1.534.069h.077c9.456-.039 17.118-7.808 17.081-17.302v-19.825c.19-8.733-6.144-16.231-14.787-17.457zm6.845 17.412v19.887c.02 5.1-4.094 9.265-9.173 9.286-.294-.002-.58-.012-.793-.03-19.563-2.137-38.629-8.955-55.17-19.736-15.327-9.79-28.576-23.108-38.334-38.543C47.34 87.021 40.557 67.769 38.477 48.08a9.218 9.218 0 0 1 2.098-6.752 9.138 9.138 0 0 1 7.06-3.326h19.808c.032-.002.062-.002.092-.002 4.566 0 8.476 3.404 9.111 7.918a89.669 89.669 0 0 0 4.834 19.497c1.259 3.366.445 7.194-2.055 9.736l-8.369 8.412a4.022 4.022 0 0 0-.646 4.812c9.73 17.199 23.917 31.461 41.028 41.241a3.948 3.948 0 0 0 4.766-.647l8.353-8.396a9.212 9.212 0 0 1 9.728-2.08 88.214 88.214 0 0 0 19.35 4.85c4.63.656 8.034 4.691 7.918 9.386v.098z" fill="#000001" data-color="1"></path>
                              </g>
                            </svg></a>
                          <a href="https://www.instagram.com/onemusicrecordsofficial/" target="_blank">
                            <img src={instagram} alt=""
                              style={{ width: 50, marginLeft: 33 }} /></a>
                          <a href="https://api.whatsapp.com/message/CYNLOEAFI5GGP1?autoload=1&app_absent=0"
                            target="_blank"><img src={whatsapp} alt=""
                              style={{ width: 50 }} /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          : <></>
      }
      <LoadingOverlay visible={loader} overlayBlur={2} />
      {showEdit ? <Footer /> : null}
    </>
  )
}

export default Profile
