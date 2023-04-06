import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function ProductCard(props) { // props.product is the product we are selling
    const product = props;
    const cart = useContext(CartContext);
    const id = props.id
    const productQuantity = cart.getProductQuantity(id);
    var currentUserID = localStorage.getItem('id')

    if(currentUserID>0){
        return (
            <Card>
                <Card.Body>
                <Card className='cards' >
                    <Card.Img variant="top" src={props.picture} style={{ marginTop: 10 }} />
                    <Card.Text>{props.genre}</Card.Text>
                    <Card.Title>{props.title}</Card.Title>
                    { productQuantity > 0 ?
                        <>
                            <Form as={Row}>
                                <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                                <Row sm="6" style={{marginLeft:50}}>
                                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                                </Row>
                            </Form>
                            <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                        </>
                        :
                        <Card.Text>{props.price} Dhs<Button id='purchasebtn' variant="warning" style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => cart.addOneToCart(id)}> <FaShoppingCart /></Button></Card.Text>
                    }
                    
                    
    
                </Card>
    
                    
                </Card.Body>
            </Card>
        )
    }
    else{
        return (
            <Card>
                <Card.Body>
                <Card className='cards' >
                    <Card.Img variant="top" src={props.picture} style={{ marginTop: 10 }} />
                    <Card.Text>{props.genre}</Card.Text>
                    <Card.Title>{props.title}</Card.Title>
                    { productQuantity > 0 ?
                        <>
                            <Form as={Row}>
                                <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                                <Row sm="6" style={{marginLeft:50}}>
                                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                                </Row>
                            </Form>
                            <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                        </>
                        :
                        <Card.Text>{props.price} Dhs<Button id='purchasebtn' variant="danger" style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => cart.addOneToCart(id)} disabled> <FaShoppingCart /></Button></Card.Text>
                    }
                    
                    
    
                </Card>
    
                    
                </Card.Body>
            </Card>
        )
    }
}

export default ProductCard;