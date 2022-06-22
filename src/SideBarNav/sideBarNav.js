import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Button from 'react-bootstrap/Button';


const NavBar = () => (
    <Container className="navbar-container">
      <Navbar id="nav">
        <Navbar.Brand href="/" id="nav-title">
          Plan Life
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text id="nav-text">
            <Link id="user-login" to="/signup">
              <Button variant="outline-light" type="submit">
             Sign In
              </Button>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
);

export default NavBar;