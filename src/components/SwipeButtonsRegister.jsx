import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SwipeButtons.css';

const SwipeButtonsRegister = () => {
  const navigate = useNavigate();

  const handleUserRegister = () => {
    navigate('/register/user');
  };

  const handleTrainingCenterRegister = () => {
    navigate('/register/training-center');
  };

  return (
    <div className="swipe-container">
      <div className="swipe-buttons">
        <div className="swipe-button" onClick={handleUserRegister}>
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="swipe-button" onClick={handleTrainingCenterRegister}>
          <i className="fa-solid fa-industry"></i>
        </div>
      </div>
    </div>
  );
};

export default SwipeButtonsRegister;
