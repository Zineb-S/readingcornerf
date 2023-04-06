import React from 'react'
import ReactDOM from 'react-dom/client';

import '../../App.css';
import { books } from '../../data/books';
import Book from './Book';
import NavBar from '../homepage/Navbar';
const Bestsellers = () => {
  return (
    <><div className='main-body'>
          <h1 className='main-title'>
              Best Sellers <span>in Books</span>
          </h1>
          <h4 className='date'>January 2023</h4>
          <article className='book-list'>
              {books.map((book, index) => {
                  return <Book {...book} key={book.id} number={index} />;
              })}
          </article>

      </div><NavBar /></>
  )
}

export default Bestsellers