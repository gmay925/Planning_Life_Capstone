import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalInformation.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function PersonalInformation() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const getPersonalInfo = async () => {
    const res = await fetch('/preferences');
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    // eslint-disable-next-line
    throw { status: res.status, message: json.message };
  };

  const personalInfoSubmit = async (body) => {
    const res = await fetch('/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (res.ok) {
      return true;
    }
    throw json;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await personalInfoSubmit({
        name,
        email,
        phoneNumber,
        address,
      });
      navigate('/preferences');
    } catch (error) {
      navigate('/logout');
    }
  };

  useEffect(() => {
    getPersonalInfo().then((data) => {
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setAddress(data.address || '');
    }).catch((error) => {
      if (error.status === 401) {
        navigate('/logout');
      }
    });
  }, [navigate]);

  return (
    <Container className="personalInfo-main">
      <Form onSubmit={onSubmit} className="form">
        <h3 className="title">Personal Information</h3>
        <Form.Group
          className="mb-3 personalInfo-container"
          controlid="formBasicName"
        >
          <Form.Label>
            Name:
            <Form.Control
              type="text"
              value={name}
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Label>
          <Form.Label>
            Email:
            <Form.Control
              type="email"
              value={email}
              className="mb-3"
              controlid="formBasicEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Label>
          <Form.Label>
            Phone Number:
            <Form.Control
              className="mb-3"
              controlid="phoneNumber"
              value={phoneNumber}
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Label>
          <Form.Label>
            Address:
            <Form.Control
              className="input"
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Label>
          <Button type="submit" className="update-infoBtn">
            Update Personal Information
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
