import React from 'react';
import rocket from './media/rocket.png';
import sky from './media/sky.png';
import './LandingPage.css';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const LandingPage = () => {
  const { login, register } = useKindeAuth();

  return (
    <div className="landing-page">
      <div className="btn-container">
        <button onClick={login} className="button-64" type="button">Log In</button>
        <button onClick={register} className="button-64" type="button">Sign Up</button>
      </div>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
    </div>
  );
}

export default LandingPage;
