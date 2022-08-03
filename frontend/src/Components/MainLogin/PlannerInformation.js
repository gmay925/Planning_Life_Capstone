import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlannerInformation.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MainLogin from './MainLogin';

export default function PlannerInformation() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const getPlannerInfo = async () => {
    const res = await fetch('/planner');
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    // eslint-disable-next-line
    throw { status: res.status, message: json.message };
  };

  const plannerInfoSubmit = async (body) => {
    const res = await fetch('/planner', {
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
      await plannerInfoSubmit({
        name,
        email,
      });
      navigate('/mainlogin');
    } catch (error) {
      navigate('/logout');
    }
  };

  useEffect(() => {
    getPlannerInfo().then((data) => {
      setName(data.name);
      setEmail(data.email);
    }).catch((error) => {
      if (error.status === 401) {
        navigate('/logout');
      }
    });
  }, [navigate]);

  return (
    <Container className="plannerInfo-main">
      <Form onSubmit={onSubmit} className="form">
        <h3 className="title">My Planner Information</h3>
        <Form.Group
          className="mb-3 plannerInfo-container"
          controlid="formBasicName">
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
          <Button type="submit" className="update-infoBtn">
            Update Planner Information
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
