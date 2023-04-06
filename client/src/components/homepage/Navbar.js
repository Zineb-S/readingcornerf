import {Button, Container, Navbar} from 'react-bootstrap';
import {  useContext } from 'react';
import { CartContext } from "./CartContext";
import CartProduct from './CartProduct';
import React, { useState } from 'react'

import Nav from 'react-bootstrap/Nav';

import logo from '../../assets/logo.png'
import { FaShoppingBasket ,FaRegHeart, FaUserAlt } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {  Modal, ModalBody, ModalHeader, ModalTitle, NavDropdown } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getProductData } from '../user/productsStore';
function NavbarComponent() {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    var currentUserID = localStorage.getItem('id')
    var orderBooks = ''
    var total = cart.getTotalCost()
    var date = new Date().toJSON()
    
   // product data loop to get titles of books by ids x quantity then push them to array then submit order

    const checkout = async () => {
      
        cart.items.map( (currentProduct, idx) => (
            orderBooks+=`${getProductData(currentProduct.id)?.title} x ${currentProduct.quantity} `
          
        ))
        
        localStorage.setItem('books',orderBooks)
        localStorage.setItem('total',total)
        localStorage.setItem('date',date)
            orderBooks=''
        console.log(cart.items)
        await fetch('http://localhost:3001/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }
    return (
        <>
        
   
        <Navbar key={'sm'} bg="light" expand={false} fixed='bottom' id='navbar' className="mb-3">
          <Container fluid>
          <Navbar.Brand href="/"><img src={logo} width={40} alt='logo'></img> My Reading Corner</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'sm'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#link" ><Button variant='light'><FaRegHeart id='navicons'/> WishList </Button></Nav.Link>
                <Nav.Link href="/login" ><Button variant='light'><FaUserAlt id='navicons' /> Login </Button></Nav.Link>
                <Nav.Link href="#" ><Button variant='light' onClick={handleShow}><FaShoppingBasket id='navicons'/> {productsCount} Items </Button></Nav.Link>
                 
                 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

         
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;