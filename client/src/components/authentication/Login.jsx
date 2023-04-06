import React, { useContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {MDBContainer,MDBTabs,MDBTabsItem,MDBTabsLink,MDBTabsContent,MDBTabsPane,MDBBtn,MDBIcon,MDBInput,MDBCheckbox}from 'mdb-react-ui-kit';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../homepage/Navbar'
import { FaFacebookF ,FaTwitter,FaGoogle,FaGithub} from 'react-icons/fa';
import ProtectedRoutes from './ProtectedRoutes';


const Login = () => {
  
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const navigate = useNavigate();

  const navigateToProfile = (password, accessToken) => {
    // 👇️ navigate to user profile

    navigate('/profile' ,{ state: { password: password, accessToken: accessToken } });
  };

  const navigateDashboard = (password, accessToken) => {
    // 👇️ navigate to admin dashboard 
    navigate('/dashboard' , { state: { password: password, accessToken: accessToken } });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://readingcornerb.herokuapp.com/api/login", { email, password });
      console.log(res.data)
      localStorage.setItem('id',res.data[0].user_id)
      localStorage.setItem('fname',res.data[0].user_first_name)
      localStorage.setItem('lname',res.data[0].user_last_name)
      localStorage.setItem('email',res.data[0].user_email)
      localStorage.setItem('password',res.data[0].user_password)
      localStorage.setItem('role',res.data[0].user_role)
      localStorage.setItem('token',res.data[1])
      const role = localStorage.getItem('role')
      if (role === "admin") {

        navigateDashboard(localStorage.getItem('password'), localStorage.getItem('token'));
      }
      else {
        navigateToProfile(localStorage.getItem('password'), localStorage.getItem('token'));
      }

    } catch (err) {
      toast.error('Incorrect Email or Password');

    }
  };
  const handleSignUp = () => {
    toast.success('Your account has been created');
    toast.success('Use your credentials to login');
  };
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  return (
    <>
<Outlet />
<ToastContainer />
    <NavBar></NavBar>
    <div id='login'>
      <MDBContainer id='authContainer' className="p-3 my-5 d-flex flex-column w-50">

        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>

          <MDBTabsPane show={justifyActive === 'tab1'}>

            <div className="text-center mb-3">
              <p>Sign in with:</p>

              <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' , height:'40px',marginTop:60}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='facebook' size="sm"> <FaFacebookF /> </MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='twitter' size="sm"> <FaTwitter /></MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='google' size="sm"><FaGoogle/></MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='github' size="sm"><FaGithub/></MDBIcon>
                </MDBBtn>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)} />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" type='submit' onClick={handleSubmit}>Sign in</MDBBtn>
            <p className="text-center">Not a member? <a href="#!">Register</a></p>

          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>

            <div className="text-center mb-3">
              <p>Sign up with:</p>

              <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' , height:'10px'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='facebook' size="sm"> <FaFacebookF /> </MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='twitter' size="sm"> <FaTwitter /></MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='google' size="sm"><FaGoogle/></MDBIcon>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#000' }}>
                  <MDBIcon fab icon='github' size="sm"><FaGithub/></MDBIcon>
                </MDBBtn>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput wrapperClass='mb-4' placeholder='First Name' id='form1' type='text' />
            <MDBInput wrapperClass='mb-4' placeholder='Last Name' id='form1' type='text' />
            <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password' />

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100" onClick={handleSignUp}>Sign up</MDBBtn>

          </MDBTabsPane>

        </MDBTabsContent>

      </MDBContainer>
      </div>
    </>
  )
}

export default Login