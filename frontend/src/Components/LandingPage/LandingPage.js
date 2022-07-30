import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css';

const LandingPage = () => (
  <div className="landing">
    <NavBar />
    <img id="dream" src="../img/dream.jpg" alt="dream" />
    <h1>Planning Life</h1>
   <h2>Getting your vision down is the first step in reaching a goal. 
      Start your free account today to access a planner that includes:</h2>
    <li>Goals</li>
    <li>Journal</li>
    <li>Health Tracking</li>
    <li>Task</li>
    <li>
      <Link id="sign-up" to="/signup"><button className="signUp" variant="outline-light" type="submit">Sign Up Today</button>
    </Link> </li>
    <li>
    <Link id="user-login" to="/login">
      <button className="userDropDown" variant="success" type="submit">
         Log In
       </button>
      </Link> </li>
  </div> 
);

export default LandingPage;
