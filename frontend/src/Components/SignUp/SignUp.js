import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import { DayPicker, useInput } from 'react-day-picker';
import { formatPhoneNumber } from '../utils/phone-number';
import 'react-day-picker/dist/style.css';
import NavBar from '../NavBar/NavBar';


async function submitSignUp(body) {
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (res.ok) {
    localStorage.setItem('loggedIn', true);
    return true;
  }
  throw json;
}

export default function SignUp() {
  const navigate = useNavigate();

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: new Date(),
    format: 'PP',
    required: true,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedEmail, setHasTypedEmail] = useState(false);
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [hasTypedConfirmPassword, setHasTypedConfirmPassword] = useState(false);
  const [hasTypedPhoneNumber, setHasTypedPhoneNumber] = useState(false);
  const [message, setMessage] = useState('');
  const isValidName = Boolean(name);
  const isValidEmail = validator.isEmail(email);
  const isValidPassword = password.length >= 6;
  const isValidConfirm = confirmPassword === password;
  const isValidPhone = validator.isMobilePhone(phoneNumber);
  const allValid = isValidName
    && isValidEmail
    && isValidPassword
    && isValidConfirm
    && isValidPhone;

  const footer = (
    <label>
      <input
        {...inputProps}
        className="input-reset pa2 ma2 bg-white black ba"
        data-testid="date-input"
      />
    </label>
  );

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true' ) {
      navigate('/signup');
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitSignUp({
        name,
        email,
        password,
        confirmPassword,
        birthday: inputProps.value,
        phoneNumber,
      });
      navigate('/');
    } catch (error) {
      setMessage(error.message);

    }
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '1rem' }}>
        <h1 className='text-center mb-3'>Sign Up</h1>
        <Form onSubmit={onSubmit} className='text-center'>
          <Form.Group className="mb-3" controlid="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedName && !isValidName}
              onChange={(e) => {
                setName(e.target.value);
                setHasTypedName(true);
              }}
              placeholder="Enter your name"
            />
            <Form.Control.Feedback type="invalid">
            Must enter a name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlid="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedEmail && !isValidEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                setHasTypedEmail(true);
              }}
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Must enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedPassword && !isValidPassword}
              onChange={(e) => {
                setPassword(e.target.value);
                setHasTypedPassword(true);
              }}
              type="password"
              placeholder="Enter Password"
            />
            <Form.Control.Feedback type="invalid">
            Must enter a password with at least 6 characters
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlid="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedConfirmPassword && !isValidConfirm}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setHasTypedConfirmPassword(true);
              }}
              type="password"
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback type="invalid">
            Passwords do not match
            </Form.Control.Feedback>{' '}
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column align-items-center" controlid="dateOfBirth">
            <Form.Label>Select Birthday *Must be at least 13*</Form.Label>
            <DayPicker
              {...dayPickerProps}
              mode="single"
              footer={footer}
              fromYear={1900}
              toYear={2011}
              captionLayout="dropdown"
              />
          </Form.Group>
          <Form.Group className="mb-3" controlid="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              isInvalid={hasTypedPhoneNumber && !isValidPhone}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(formatPhoneNumber(e.target.value));
                setHasTypedPhoneNumber(true);
              }}
              type="tel"
              placeholder="(123) 456-7890"
            />
            <Form.Control.Feedback type="invalid">
            Please enter a valid phone number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
          <div className='text-center'>
              <Link id="user-signUp" to="/goalsetter">
              <Button variant="success" type="submit" disabled={!allValid}>
              Sign Up
              </Button>
              </Link>
            </div>
            </Form.Group>
            </Form>
            </Container>
      <div className="text-center signup-blurb">
        <p>Already have an account?</p>
        <Link id="user-login" to="/login">
          <Button variant="secondary" type="submit">
          Log In
          </Button>
        </Link>
      </div>
      </>
);
}