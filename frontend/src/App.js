import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage />} />

    </Routes>
  );
}

export default App;
