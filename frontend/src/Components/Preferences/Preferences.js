import React from 'react';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Delivery from './Delivery/Delivery';
import Icons from './Icons/Icons';
import './Preferences.css';
import Notification from './Notification/Notification';
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
            <Delivery />
            <Notification />
          </div>
        </div>
        <div className="pref-right">
          <Icons />
        </div>
      </div>
    </>
  );
}
