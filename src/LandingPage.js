import React, {useEffect} from 'react';
import rocket from './media/rocket.png';
import sky from './media/sky.png';
import './LandingPage.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const LandingPage = () => {
  const { isAuthenticated, login, register, logout  } = useKindeAuth();
  const navigate = useNavigate();

//   const handleLogin = async () => {
//     await login();  
//     if (isLoggedIn) {
//         navigate('/after-login');
//     }
//   };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/first-form');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    // Perform login logic
    await login(); // Wait for login process to complete
  };

  if (isAuthenticated) {
    return <Navigate to="/first-form" />;
  }

  return (
    <div className="landing-page">
      <div className="btn-container">
        {!isAuthenticated ? (
            <><button onClick={handleLogin} className="button-64" type="button">Log In</button>
            <button onClick={register} className="button-64" type="button">Sign Up</button></>
        ): (
            <button onClick={logout} className="button-64" type="button">Log Out</button>
        ) }

      </div>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
    </div>
  );
}

export default LandingPage;
