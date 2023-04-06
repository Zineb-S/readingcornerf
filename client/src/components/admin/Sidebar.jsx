import React, { useState } from "react";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SidebarData } from "./SlidebarData";
import "./SideBar.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Sidebar = () => {
 const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const navigateHome = () => {
    toast.success("See you later");
    navigate('/');
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res2 = await axios.post("https://readingcornerb.herokuapp.com/api/logout",
        token
        , {
          headers: {
            'authorization': `Bearer ${token}`
          }
        })
      if (res2) {
        localStorage.clear()
        window.location.reload()
        //navigateHome()
      }

    } catch (err) {
      console.log(err);
    }

  };
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          <Button variant="danger" onClick={handleLogout} >Log Out</Button>
          </ul>
          
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar