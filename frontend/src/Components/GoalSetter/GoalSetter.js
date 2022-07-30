import React from "react";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';

export default function GoalSetter() {
  const [goals, setGoals] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function submitGoals(body) {
    const res = await fetch('/goalsetter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (res.ok) {
    return json;
  }
  // eslint-disable-next-line
  throw { status: res.status, message: json.message };
}

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    await submitGoals({
      goals,
     });
  } catch (error) {
    setMessage(error.message);
    if (error.status === 401) {
      navigate('/logout');
    }
  }
};
  return (
    <>
    <NavBar />
    <div className="goal-container">
      <h1>Goals</h1>
      <p>Where do you want to see yourself in the next 5 years? How about in the next 6 months?
        Rather long term or short, think about where you want to be to begin setting your goals today!</p> 
      <Container style={{ marginTop: '1rem' }}>
        <Form onSubmit={onSubmit} className='text-center'>
          <Form.FormLabel>Goal Setter</Form.FormLabel>
          <Form.Control
          required
          type="string"
          onChange={(e) => {
            setGoals(e.target.value);
          }}
          placeholder="Enter a goal"
          />

        </Form>

      </Container>
      
    </div>
    </>
  )
}
