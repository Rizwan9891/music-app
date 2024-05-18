import { BackgroundImage, Card, CardSection, Image, Pagination, TextInput } from '@mantine/core'
import React ,{useState,useEffect} from 'react'
import deleteIcon from "./assests/deleteIcon.png";
import './Css/Service.css'
const PaginationList = ({service, deleteService}) => {
    const [pageItems, setPageItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        setPageItems(service.slice(activePage*itemsPerPage-itemsPerPage,activePage*itemsPerPage));
        setTotalPages(Math.ceil(service.length/itemsPerPage))
    }, [service,activePage]);
  return (
   <div className='paginate-container'>
     <div className='paginate-box'>
           {pageItems.length >= 0 ? (
              pageItems.map((serviceInfo, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className="service-card"
                >
                  <CardSection className="card-section-image">
                    <BackgroundImage
                      className="service-logo"
                      src={serviceInfo.secure_url}
                      radius="sm"
                    ></BackgroundImage>
                    <Image
                      style={{ cursor: "pointer" }}
                      height={30}
                      width={30}
                      src={deleteIcon}
                      onClick={() => deleteService(serviceInfo._id)}
                      color="red.8"
                      variant="light"
                    >
                      Delete
                    </Image>
                  </CardSection>
                  <TextInput
                    className="service-card-input"
                    placeholder="Enter url here"
                  />
                </Card>
              ))
            ) : (
              <></>
            )}
    </div>
            <Pagination className='paginate-line' page={activePage} onChange={setActivePage} total={totalPages} />
   </div>
  )
}

export default PaginationList
