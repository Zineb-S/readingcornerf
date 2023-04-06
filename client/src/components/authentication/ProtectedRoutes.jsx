import React from 'react'
import { Outlet } from 'react-router-dom'
import Account from '../user/Account'
import Dashboard from '../admin/Dashboard'
import Login from './Login'
import Orders from '../admin/Orders'
import Books from '../admin/Books'
import Users from '../admin/Users'
import Success from '../user/Success';
import Cancel from '../user/Cancel';
import Home from '../homepage/Home'

const ProtectedRoutes = (props) => {

    var path = props.name
    var role = localStorage.getItem('role')
    var total = localStorage.getItem('total')
    if (total){
        if(path == "success"){return <Success/>}
        if(path == "cancel"){ return <Cancel/>}
        else {return <Home/>}
    }
    if (role == "admin") {
        if (path == 'dashboard'){
            return <Dashboard />
        }
        if (path == 'orders'){
            return <Orders />
        }
        if (path == 'books'){
            return <Books />
        }
        if (path == 'users'){
            return <Users />
        }
        
        if (path == 'login'){
            return <Dashboard/>
        }
    }
    else {
        if (role == "user") { return <Account /> }
        else {
            return <Login />
        }
    }


}
export default ProtectedRoutes