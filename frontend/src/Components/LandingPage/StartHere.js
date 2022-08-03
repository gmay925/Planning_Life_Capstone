import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function feelingMsg() {
  const hour = (new Date()).getHours();

  if (hour >= 16 && hour < 21) {
    return "How are you feeling this evening?";
  }

  if (hour >= 5 && hour < 11) {
    return "How are you feeling this morning?";
  }

  if (hour >= 12 && hour < 16) {
    return "How are you feeling this afternoon?";
  }

  return 'How are you feeling?';
}

const StartHere = () => (
  <div className='starthere'>
    <img id="dream" src="../img/dream.jpg" alt="dream" />
    <h1 id="plan-life" className='text-center'>Planning Life</h1>
   <h2>Getting your vision down is the first step in reaching a goal. 
      Start your free account today to access a planner that includes:</h2>
<br/>
    <li>Goal Setting</li>
    <li>Journal Entry</li>
    <li>Health Tracking</li>
    <li>Task Tracker</li>
    <div className="starthere-container">
      <h2 id="feeling-update">{feelingMsg()}</h2>
      <Form className="text-center">
        <Form.Group>
        <Form.Control placeholder="A place to express yourself" />
          <Link id="user-login" to="/login">
          <Button id="emotions" variant='dark' type="submit">
            Feels Check
          </Button>
          </Link>
            </Form.Group>
      </Form>
    </div>
  </div>
);
export default StartHere;