import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import book2 from "../../assets/books2.jpeg"
import cover from "../../assets/cover.jpg"
import library from "../../assets/library.jpg"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CartContext from './CartContext'
import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
const Cards = (props) => {

    const cart = useContext(CartContext)
    const productQuantity = cart.productQuantity(props.id)
    console.log(cart.item)
    return (
        <>

            <Card className='cards'>
                <Card.Img variant="top" src={props.picture} style={{ marginTop: 10 }} />
                <Card.Text>{props.genre}</Card.Text>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.price} Dhs<Button id='purchasebtn' variant="warning" style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => cart.addOneToCart(props.id)}> <FaShoppingCart /></Button></Card.Text>

            </Card>

        </>

    )
}

export default Cards