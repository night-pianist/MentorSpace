import React from 'react';
import rocket from './media/rocket.png';
import sky from './media/sky.png';
import circle from './media/title-sparkle-circle.svg'
import './AfterLoginPage.css';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const AfterLoginPage = () => {
  const { logout  } = useKindeAuth();

  return (
    <div className="after-login-page">
      <h1 className="title1 tilt-warp">MentorSpace</h1>
      <div className="btn-container">
        <button onClick={logout} className="button-64 reddit-mono" type="button">Log Out</button>
      </div>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
      <img src={circle} alt="circle" className="circle-img" />
    </div>
  );
}

export default AfterLoginPage;
