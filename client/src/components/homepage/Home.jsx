import React, { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import bannerPic from '../../assets/library.jpg'
import Carousel from 'react-bootstrap/Carousel';

import Cards from "./Cards";
import axios from 'axios';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { FaShoppingCart } from "react-icons/fa";
import ProductCard from "./ProductCard";
import NavbarComponent from "./Navbar";

const Home = () => {
  const [book, setBooks] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/books').then((response) => {
      setBooks(response.data)
      
      
    })
  }, []);
  let template = (props) => {

    const src = props.Avatar;

    return (<div>

      <img className='bookpic' src={props.book_picture} alt={props.book_picture} />

    </div>)

  }
  let buy = (props) =>{
    return ( <div><Button id='purchasebtn' variant="warning" style={{ marginLeft: 10, marginBottom: 10 }} > <FaShoppingCart /></Button></div>)
  }
  const pageSettings = { pageSize: 3 };
  const sortSettings = {
    columns: [
      { field: 'book_id', direction: 'Ascending' }
    ]
  };
  const filterSettings = {
    columns: [
      { field: 'book_price', operator: 'greaterthan', value: '' }
    ]
  };
  var rows = [];
  for (var i = 0; i < book.length; i++) {
    rows.push(<SwiperSlide><ProductCard id={book[i].book_id}  author={book[i].book_author} picture={book[i].book_picture} genre={book[i].book_genre}  title={book[i].book_title}  price={book[i].book_price}  ></ProductCard></SwiperSlide>);
  };
  return (
    <>

      <div id="banner">
      
        <Carousel variant="light" id="slidebanner">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerPic}
          width={300}
          height={300}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerPic}
          width={300}
          height={300}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerPic}
          width={300}
          height={300}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div className="col-md-12 text-center" >
    <Button variant="warning" href="/bestsellers" style={{marginTop:-3}} > Best Sellers</Button>
    <Dropdown style={{display:'inline-grid'}}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" >
              Genre      </Dropdown.Toggle>

            <Dropdown.Menu>
              
              <Dropdown.Item href="#/action-3">Classic</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Crime</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Fantasy</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Fiction</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Romance</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
      </div>
      <div id="search" >
        <InputGroup className="mb-3" >
          <Form.Control 
            placeholder="Search book by title or author"
            aria-label="Search book by title or author"
            aria-describedby="basic-addon2"
            
          />
          <InputGroup.Text id="basic-addon2" >Search</InputGroup.Text>
          </InputGroup>
         
          
      </div>
     <h3 style={{ marginLeft: 50, marginTop: 20 }}>English Books </h3>
      <div id="engbooks">
      <Swiper
            slidesPerView={6}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }}
            modules={[Pagination]}
            className="mySwiper"
        >

<Container><Row>{rows}</Row></Container>

        
        </Swiper>   
      </div>
      <div>
        <Container>
        <GridComponent  dataSource={book} allowPaging={true} pageSettings={pageSettings}filterSettings={filterSettings} allowSorting={true} sortSettings={sortSettings} allowFiltering={true}>
        <ColumnsDirective>
          <ColumnDirective field='book_picture' headerText='Picture' template={template}  textAlign="Center" />
          <ColumnDirective field='book_title' headerText='Title' />
          <ColumnDirective field='book_author' headerText='Author'  />
          <ColumnDirective field='book_genre' headerText='Genre' />
          <ColumnDirective field='book_price' headerText='Price'  />
          <ColumnDirective template={buy}  />

        </ColumnsDirective><Inject services={[Page,Sort, Filter, Group]} />
      </GridComponent>
      </Container>
      

      </div>
      

      <h3 style={{ marginLeft: 50, marginTop: 20 , marginBottom:100 }}>French Books </h3>
 
      <NavbarComponent></NavbarComponent>

    </>
  )
}

export default Home