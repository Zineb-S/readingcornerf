import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalCentered = (props) => {
  
  var [hidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   // CURRENT USER 
  var currentUserID = localStorage.getItem('id')
  var currentUserRole = localStorage.getItem('role')
  // ADMIN USER ACTIONS VARIABLES
  var email = ''
  var password = ''
  var fname = ''
  var lname = ''
  var role = 'user'
  var deletedUserID = 0
  var editedUserID = 0
    // ADMIN BOOK ACTIONS VARIABLES
    var title = ''
    var author = ''
    var genre = ''
    var picture = ''
    var price = 0
    var deletedBookID = 0
    var editedBookID = 0
     // ADMIN ORDER ACTIONS VARIABLES
  var orderUserID = 0
  var orderBooks = ''
  var total = 0
  var date = new Date().toJSON()
  var deletedOrderID = 0
  var editedOrderID = 0

 // HANDLING USER ( ADD / EDIT / DELETE)
  const [us, setUs] = React.useState([])
  React.useEffect(() => {
    axios.get('https://readingcornerb.herokuapp.com/api/users').then((response) => {
      setUs(response.data)
      console.log(response.data)
      
    })
  }, []);
  const [book, setBooks] = React.useState([])
  React.useEffect(() => {
    axios.get('https://readingcornerb.herokuapp.com/api/books').then((response) => {
      setBooks(response.data)
      console.log(response.data)
      
    })
  }, []);
  const [order, setOrders] = React.useState([])
  React.useEffect(() => {
    axios.get('https://readingcornerb.herokuapp.com/api/orders').then((response) => {
      setOrders(response.data)
      console.log(response.data)
      
    })
  }, []);
  const userIDs = Array.from(us, (_, index) => {
    return <option>{us[index].user_id}</option>;
  });
  const bookIDs = Array.from(book, (_, index) => {
    return <option>{book[index].book_id}</option>;
  });
  const orderIDs = Array.from(order, (_, index) => {
    return <option>{order[index].order_id}</option>;
  });
  const handleSubmitUser = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post(`https://readingcornerb.herokuapp.com/api/users/create`, {email: email, password: password, fname: fname, lname: lname, role: role});
      if (res) {toast.success('User Added');}

    } catch (err) {
      toast.error('Not a valid request');

    }

  };
  const handleEditUser = async (e) => {

    e.preventDefault();
    axios.put(`https://readingcornerb.herokuapp.com/api/users/edit`, {
      email: email, password: password, fname: fname, lname: lname, role: role, id: editedUserID
    }
    ).then((res) => {
      toast.success('User Edited');

    })
      .catch((err) => {
        console.log(err)
        toast.error('Not a valid Request');
      })

  };
  const handleDeleteUser = async (e) => {
   
    e.preventDefault();
    axios.delete(`https://readingcornerb.herokuapp.com/api/users/${deletedUserID}`).then((res) => {
      toast.success('User Deleted');
    })
      .catch((err) => {
        console.log(err)
        toast.error('Not a valid ID request');
      })

  };

  // HANDLING BOOK ( ADD / EDIT / DELETE)

 
  const handleSubmitBook = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post(`https://readingcornerb.herokuapp.com/api/books/create`, {title: title, author: author, genre: genre, picture: picture, price: price});
      if (res) {toast.success('Book Added');}

    } catch (err) {
      toast.error('Not a valid request');

    }

  };
  const handleEditBook = async (e) => {

    e.preventDefault();
    axios.put(`https://readingcornerb.herokuapp.com/api/books/edit`, {id:editedBookID,title: title, author: author, genre: genre, picture: picture, price: price}
    ).then((res) => {
      toast.success('Book Edited');

    })
      .catch((err) => {
        console.log(err)
        toast.error('Not a valid Request');
      })

  };
  const handleDeleteBook = async (e) => {
   
    e.preventDefault();
    axios.delete(`https://readingcornerb.herokuapp.com/api/books/${deletedBookID}`).then((res) => {
      toast.success('Book Deleted');
    })
      .catch((err) => {
        console.log(err)
        toast.error('Not a valid ID request');
      })

  };
  // HANDLING ORDER ( ADD / EDIT / DELETE)

 const handleSubmitOrder = async (e) => {

  e.preventDefault();
  try {
    const res = await axios.post(`https://readingcornerb.herokuapp.com/api/orders/create`, {books: orderBooks, total: total, date: date, id: orderUserID});
    if (res) {toast.success('Order Added');}

  } catch (err) {
    toast.error('Not a valid request');

  }

};
const handleEditOrder = async (e) => {

  e.preventDefault();
  axios.put(`https://readingcornerb.herokuapp.com/api/orders/edit`, {
    books: orderBooks, total: total, date: date, id: orderUserID , orderid:editedOrderID
  }
  ).then((res) => {
    toast.success('Order Edited');

  })
    .catch((err) => {
      console.log(err)
      toast.error('Not a valid Request');
    })

};
const handleDeleteOrder= async (e) => {
 
  e.preventDefault();
  axios.delete(`https://readingcornerb.herokuapp.com/api/orders/${deletedOrderID}`).then((res) => {
    toast.success('Order Deleted');
  })
    .catch((err) => {
      console.log(err)
      toast.error('Not a valid ID request');
    })

};
  // BUTTONS FOR ADMINS FOR USERS ACTIONS
  if (props.title == "Add User") {
    return (
      <>
      <ToastContainer />
        <Button variant="primary" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                  <Form.Control defaultValue={email} onChange={(event) => { email = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
                  <Form.Control defaultValue={password} onChange={(event) => { password = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">First Name</Form.Label>
                  <Form.Control defaultValue={fname} onChange={(event) => { fname = event.target.value; }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Last Name</Form.Label>
                  <Form.Control defaultValue={lname} onChange={(event) => { lname = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Role</Form.Label>
                  <Form.Select defaultValue={role} onChange={(event) => { role = event.target.value;  }} id="disabledSelect">
                    <option >user</option>
                    <option>admin</option>

                  </Form.Select>

                </Form.Group>

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmitUser}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Edit User") {
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Choose the User ID that you want to edit</Form.Label>
                  <Form.Select defaultValue={editedUserID} onChange={(event) => { editedUserID = event.target.value; }} id="disabledSelect">
                    {userIDs}
                  </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                  <Form.Control defaultValue={email} onChange={(event) => { email = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
                  <Form.Control defaultValue={password} onChange={(event) => { password = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">First Name</Form.Label>
                  <Form.Control defaultValue={fname} onChange={(event) => { fname = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Last Name</Form.Label>
                  <Form.Control defaultValue={lname} onChange={(event) => { lname = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Role</Form.Label>
                  <Form.Select defaultValue={role} onChange={(event) => { role = event.target.value;  }} id="disabledSelect">
                    <option>user</option>
                    <option>admin</option>

                  </Form.Select>

                </Form.Group>

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleEditUser} variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Delete User") {
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="disabledSelect">Choose the User ID that you want to delete</Form.Label>
            <Form.Select defaultValue={deletedUserID} onChange={(event) => { deletedUserID = event.target.value;  }} id="disabledSelect">

              {userIDs}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteUser}>Delete User</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // BUTTONS FOR ADMINS FOR BOOK ACTIONS
  if (props.title == "Add Book") {
    return (
      <>
      <ToastContainer />
        <Button variant="primary" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Title</Form.Label>
                  <Form.Control defaultValue={title} onChange={(event) => { title = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Author</Form.Label>
                  <Form.Control defaultValue={author} onChange={(event) => { author = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Genre</Form.Label>
                  <Form.Control defaultValue={genre} onChange={(event) => { genre = event.target.value; }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Price</Form.Label>
                  <Form.Control defaultValue={price} onChange={(event) => { price = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Picture</Form.Label>
                  <Form.Control defaultValue={picture} onChange={(event) => { picture = event.target.value;  }} id="disabledSelect"/>
                    


                </Form.Group>

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmitBook}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Edit Book") {
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Choose the Book ID that you want to edit</Form.Label>
                  <Form.Select defaultValue={editedBookID} onChange={(event) => { editedBookID = event.target.value; }} id="disabledSelect">
                    {bookIDs}
                  </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Title</Form.Label>
                  <Form.Control defaultValue={title} onChange={(event) => { title = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Author</Form.Label>
                  <Form.Control defaultValue={author} onChange={(event) => { author = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Genre</Form.Label>
                  <Form.Control defaultValue={genre} onChange={(event) => { genre = event.target.value; }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Price</Form.Label>
                  <Form.Control defaultValue={price} onChange={(event) => { price = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Picture</Form.Label>
                  <Form.Control defaultValue={picture} onChange={(event) => { picture = event.target.value;  }} id="disabledSelect"/>
                    


                </Form.Group>

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleEditBook} variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Delete Book") {
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="disabledSelect">Choose the Book ID that you want to delete</Form.Label>
            <Form.Select defaultValue={deletedBookID} onChange={(event) => { deletedBookID = event.target.value;  }} id="disabledSelect">

              {bookIDs}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteBook}>Delete Book</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
 
  // BUTTONS FOR ADMINS FOR ORDERS ACTIONS
  if (props.title == "Add Order") {
    return (
      <>
      <ToastContainer />
        <Button variant="primary" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
             
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">User ID </Form.Label>
                  <Form.Select defaultValue={orderUserID} onChange={(event) => { orderUserID = event.target.value; }} id="disabledSelect">
                    {userIDs}
                  </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Ordered Books</Form.Label>
                  <Form.Control defaultValue={orderBooks} onChange={(event) => { orderBooks = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Order Total</Form.Label>
                  <Form.Control defaultValue={total} onChange={(event) => { total = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
              

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmitOrder}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Edit Order") {  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Choose the Order ID that you want to edit</Form.Label>
                  <Form.Select defaultValue={editedOrderID} onChange={(event) => { editedOrderID = event.target.value; }} id="disabledSelect">
                    {orderIDs}
                  </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">User ID </Form.Label>
                  <Form.Select defaultValue={orderUserID} onChange={(event) => { orderUserID = event.target.value; }} id="disabledSelect">
                    {userIDs}
                  </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Ordered Books</Form.Label>
                  <Form.Control defaultValue={orderBooks} onChange={(event) => { orderBooks = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">Order Total</Form.Label>
                  <Form.Control defaultValue={total} onChange={(event) => { total = event.target.value;  }} id="disabledTextInput" />
                </Form.Group>
              
                

                

              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleEditOrder} variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  if (props.title == "Delete Order") {
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          {props.title}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="disabledSelect">Choose the Order ID that you want to delete</Form.Label>
            <Form.Select defaultValue={deletedOrderID} onChange={(event) => { deletedOrderID = event.target.value;  }} id="disabledSelect">

              {orderIDs}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteOrder}>Delete Order</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalCentered