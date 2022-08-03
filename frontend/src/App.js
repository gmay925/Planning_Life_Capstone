import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import GoalSetter from "./Components/GoalSetter/GoalSetter";
import SignUp from "./Components/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./Components/Login/Login";
import Preferences from "./Components/Preferences/Preferences";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/goal" element={<GoalSetter />} />
      <Route exact path="/preferences" element={<Preferences />} />
    </Routes>
 
  );
}

export default App;
