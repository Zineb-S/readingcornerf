import React from 'react'
import NavbarComponent from '../homepage/Navbar'

const Cancel = () => {
  localStorage.removeItem('books')
  localStorage.removeItem('total')
  localStorage.removeItem('date')
  return (
    <><div>You cancelled your stripe payment ! </div><NavbarComponent></NavbarComponent></>
  )
}

export default Cancel