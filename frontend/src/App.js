import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
    
}

export default App;
