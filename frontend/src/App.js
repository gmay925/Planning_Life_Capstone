import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route exact path='/login' element={<Login />} />

    </Routes>
  );
}

export default App;
