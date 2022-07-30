import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-day-picker';
import { Link } from 'react-router-dom';
import './NavBar.css';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [name, setName] = useState('');
  // const [userIcon, setUserIcon] = useState('');

  const getUser = async () => {
    const res = await fetch('/goalsetter');
    const json = await res.json();
    return json;
  };

  useEffect(() => {
    if (!localStorage.getItem('loggedIn')) return;
    getUser().then((data) => {
      setName(data.name);
    });
  }, []);

  return (
    <Container className="navbar-container">
      <Navbar id="nav">
        <Navbar.Brand href="/" id="nav-title">
          <h1>Planning Life</h1>
          <h2>Creating a life you love by planning! </h2>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text id="nav-text">
            {!name && (
              <Link id="user-login" to="/login">
                <Button variant="success" type="submit">
                  Log In
                </Button>
              </Link>
            )}
            {name && (
              <Link id="user-submit" to="/signup">
                <Button variant="outline-light" type="submit">
                  {name}
                </Button>
              </Link>
            )}
            {name && (
              <DropdownButton
                className="userDropDown"
                as={ButtonGroup}
                variant="outline-light"
                title={
                  <>
                   {name}
                  </>
                }
                id="bg-nested-dropdown"
              >
                <Link className="dropdown-links" id="user-goalsetter" to="/goalsetter">
                  <Dropdown.Item as="button" eventKey="1">
                    Goal Setter
                  </Dropdown.Item>
                </Link>
                <Link className="dropdown-links" id="user-journal" to="/journal">
                  <Dropdown.Item as="button" eventKey="1">
                    Journal
                  </Dropdown.Item>
                </Link>
                <Link className='dropdown-links' id="health-tracking" to="/healthtracker">
                  <Dropdown.Item as="button" eventKey="1">
                    Health Tracking
                  </Dropdown.Item>
                </Link>
                <Link className="dropdown-links" id="logout" to="/logout" name="logoutButton">
                  <Dropdown.Item as="button" eventKey="2">
                    Logout
                  </Dropdown.Item>
                </Link>
              </DropdownButton>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default NavBar;
