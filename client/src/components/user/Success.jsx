import axios from 'axios';
import React from 'react'
import { Button, Navbar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import NavbarComponent from '../homepage/Navbar';

const Success = () => {
  var currentUserID = localStorage.getItem('id')
  var orderBooks = localStorage.getItem('books')
  var total = localStorage.getItem('total')
  var date = localStorage.getItem('date')
  console.log(currentUserID, orderBooks, total, date)
  const handleSubmitOrder = () => {

    if (total) {
      try {
        const res = axios.post(`http://localhost:3001/api/orders/create`, { books: orderBooks, total: total, date: date, id: currentUserID });
        if (res) { toast.success('Order Added'); }

      } catch (err) {
        toast.error('Not a valid request');

      }
    }

    localStorage.removeItem('books')
    localStorage.removeItem('total')
    localStorage.removeItem('date')

  };
  handleSubmitOrder()
  return (
    <><ToastContainer /><div >Thank You for your purchase</div>
    <NavbarComponent></NavbarComponent></>
  )
}

export default Success