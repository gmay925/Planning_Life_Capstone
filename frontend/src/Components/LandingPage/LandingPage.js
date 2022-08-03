import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css';
import StartHere from './StartHere';

const LandingPage = () => (
  <div className="landing">
    <NavBar />
    <StartHere />
      <Link id="sign-up" to="/signup"><button className="signUp" variant="outline-light" type="submit">Sign Up Today</button>
    </Link> 
     <Link id="user-login" to="/login">
      <button className="userDropDown" variant="success" type="submit">
         Log In
       </button>
      </Link>
    </div>
);

export default LandingPage;
