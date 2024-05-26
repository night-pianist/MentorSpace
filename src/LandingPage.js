import React, {useEffect} from 'react';
import rocket from './media/rocket.png';
import sky from './media/sky.png';
import circle from './media/title-sparkle-circle.svg'
import logo from './media/logo.svg'
import './LandingPage.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const LandingPage = () => {
  const { isAuthenticated, login, register, logout  } = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/form');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    // Perform login logic
    await login(); // Wait for login process to complete
  };

  return (
    <div className="landing-page">

        <h1 className="title tilt-warp">MentorSpace</h1>
      <div className="btn-container reddit-mono">
        <Link to="/" className="home-link">
            <img src={logo} alt="Home" className="home-icon" />
        </Link>

        {!isAuthenticated ? (
            <><button onClick={handleLogin} className="button-64 reddit-mono" type="button">Log In</button>
            <button onClick={register} className="button-64 reddit-mono" type="button">Sign Up</button></>
        ): (
            <button onClick={logout} className="button-64 reddit-mono" type="button">Log Out</button>
        ) }

      </div>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
      <img src={circle} alt="circle" className="circle-img" />
    </div>
  );
}

export default LandingPage;
