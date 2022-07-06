import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [name, setName] = useState('');
  // const [userIcon, setUserIcon] = useState('');

  const getUser = async () => {
    const res = await fetch('/preferences');
    const json = await res.json();
    return json;
  };

  useEffect(() => {
    if (!localStorage.getItem('loggedIn')) return;
    getUser().then((data) => {
      setName(data.name);
    });
  }, []);

  // useEffect(() => {
  //   setName('name');
  //   setUserIcon('burger');
  // }, []);

  return (
    <Container className="navbar-container">
      <Navbar id="nav">
        <Navbar.Brand href="/" id="nav-title">
          Planning Life
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text id="nav-text">
            {!name && (
              <Link id="user-login" to="/login">
                <Button variant="outline-light" type="submit">
                  Log In
                </Button>
              </Link>
            )}
            {name && (
              <Link id="user-preferences" to="/preferences">
                <Button variant="outline-light" type="submit">
                  {name}
                </Button>
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default NavBar;
