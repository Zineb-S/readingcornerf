import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './homepage/Home';
import Bestsellers from './homepage/Bestsellers';
import ProtectedRoutes from './authentication/ProtectedRoutes';
import Cart from '../components/user/Cart'


const Router = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<ProtectedRoutes name='login' />} />
                <Route path="/dashboard" element={<ProtectedRoutes name='dashboard' />} />
                <Route path="/profile" element={<ProtectedRoutes name='profile'/>} />
                <Route path="/bestsellers" element={<Bestsellers/>} />
                <Route path="/orders" element={<ProtectedRoutes name='orders'/>} />
                <Route path="/books" element={<ProtectedRoutes name='books'/>} />
                <Route path="/users" element={<ProtectedRoutes name='users'/>} />
                <Route path="/success" element={<ProtectedRoutes name='success'/>} />
                <Route path="/cancel" element={<ProtectedRoutes name='cancel'/>} />
            </Routes>
        </div>

    );
}

export default Router