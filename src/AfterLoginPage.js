import React from 'react';
import rocket from './media/rocket.png';
import sky from './media/sky.png';
import './AfterLoginPage.css';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const AfterLoginPage = () => {
  const { logout  } = useKindeAuth();

  return (
    <div className="after-login-page">
      <div className="btn-container">
        <button onClick={logout} className="button-64" type="button">Log Out</button>
      </div>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
    </div>
  );
}

export default AfterLoginPage;
