import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import GoalSetter from "./Components/GoalSetter/GoalSetter";
import SignUp from "./Components/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/goalsetter" element={<GoalSetter />} />
    </Routes>
 
  );
}

export default App;
