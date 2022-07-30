import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import './Login.css';
import NavBar from '../NavBar/NavBar';

async function submitLogin(body) {
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });

  if (res.ok) {
    localStorage.setItem('loggedIn', 'true');
    return true;
  }

  const json = await res.json();
  throw json;
}

export default function Login () {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasTypedEmail, setHasTypedEmail] = useState(false);
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [message, setMessage] = useState('');

  const isValidEmail = validator.isEmail(email);
  const isValidPassword = password.length >= 6;
  const allValid = isValidEmail && isValidPassword;

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitLogin({
        email,
        password,
      });
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '2rem' }}>
        <h1 id='login-heading' className='text-center'>Log In </h1>
        <Form onSubmit={onSubmit} className='text-center'>
          <Form.Group className='mb-3' controlid='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedEmail && !isValidEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                setHasTypedEmail(true);
              }}
              placeholder='Enter your email'
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlid='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedPassword && !isValidPassword}
              onChange={(e) => {
                setPassword(e.target.value);
                setHasTypedPassword(true);
              }}
              type='password'
              placeholder='Password'
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a password with at least 6 characters
            </Form.Control.Feedback>
          </Form.Group>
          <Button id='login-btn' variant='success' type='submit' disabled={!allValid}>
            Log In
          </Button>
        </Form>
        <div className='errorMessage'>{message}</div>
      </Container>
      <div className="text-center">
        <p>Don't have an account?</p>
        <Link id="user-signup" to="/signup">
          <Button variant="secondary" type="submit">
            Register
          </Button>
        </Link>
      </div>
    </>
  );
}
