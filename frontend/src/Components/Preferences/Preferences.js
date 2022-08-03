import React from 'react';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import PlannerInformation from './PlannerInformation';
import './Preferences.css';
import ChangePassword from './ChangePassword/ChangePassword';
import NavBar from '../NavBar/NavBar';

export default function Preferences() {
  return (
    <>
      <NavBar /> 
      <div className="pref-container">
        <h1 className="pref-left">Preferences</h1>
        <div className="pref-center">
          <div className="pref-center-top">
            <PersonalInformation />
            <ChangePassword />
          </div>
          <div className="pref-center-bottom">
            <PlannerInformation />
          </div>
        </div>
      </div>
    </>
  );
}
