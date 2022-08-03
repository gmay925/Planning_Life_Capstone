import React from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";


export default function GoalSetter() {
  const [goals, setGoals] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function submitGoalData(body) {
    const res = await fetch('/goals', {
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

  // const updateGoals = async (body) => {
  //   const res = await fetch('/goal', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body),
  //   });
  //   const json = await res.json();
  //   if (res.ok) {
  //     return true;
  //   }
  //   // eslint-disable-next-line no-throw-literal
  //   throw { status: res.status, message: json.message };
  // };

  // const submitGoals = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await updateGoals({
  //       goals: [...new Set([...goals])]
  //     });
  //   } catch (e) {
  //     if (e.status === 401) {
  //       navigate('/logout');
  //     }
  //   }
  // };

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    await submitGoalData({
      goal: String(goals),
     });
  } catch (error) {
    setMessage(error.message);
    if (error.status === 401) {
      navigate('/logout');
    }
  }
};
// const getGoals = async () => {
//   const res = await fetch('/goal');
//   const json = await res.json();

//   if (res.ok) {
//     return json;
//   }

//   // eslint-disable-next-line no-throw-literal
//   throw { status: res.status, message: json.message };
// };

// useEffect(() => {
//   getGoals().then((data) => {
//     setGoals(data.goals.filter);
//   }).catch((e) => {
//     if (e.status === 401) {
//       navigate('/logout');
//     }
//   });
// }, []);

  return (
    <>
    <NavBar />
      <h1 className="tect-center mb-2 mb-2 pt-2"> Goal Setter </h1>
      <div className="goal-main">
        <div className="goal-left">
      <Container style={{ marginTop: '2rem' }}>
        <Form onSubmit={onSubmit} className='text-center'>
          <Form.Label>Goal Setter</Form.Label>
          <Form.Control
          required
          type="string"
          onChange={(e) => {
            setGoals(e.target.value);
          }}
          placeholder="Enter a goal"
          />

        </Form>
        <Link to='/'>
              <Button variant="secondary" type="submit">
              Return Home
              </Button>
            </Link>

      </Container>
      </div>
    </div>
    </>
  );
}
