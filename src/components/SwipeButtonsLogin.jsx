import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SwipeButtons.css';

const SwipeButtonsLogin = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/login/user');
  };

  const handleTrainingCenterLogin = () => {
    navigate('/login/training-center');
  };

  return (
    <div className="swipe-container">
      <div className="swipe-buttons">
        <div className="swipe-button" onClick={handleUserLogin}>
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="swipe-button" onClick={handleTrainingCenterLogin}>
          <i className="fa-solid fa-industry"></i>
        </div>
      </div>
    </div>
  );
};

export default SwipeButtonsLogin;
