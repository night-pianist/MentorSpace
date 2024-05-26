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
      <h1 className="heading">Launch your career to new heights</h1>
      <h2 className="subtitle">Our mission is to empower women, non-binary, and underrepresented genders in engineering by pairing them with mentors who can help guide them through their careers, whether that be industry, research, or anything!</h2>
      <h1 className="heading2">Mentorship and Guidance</h1>
      <h2 className="subtitle2">Students are matched with mentors through their space of preferences, giving them a ranked list of mentors they can choose from.</h2>
      <h1 className="heading3">Testimonials</h1>
      <h2 className="subtitle3">"Especially in technical spaces, I like having communities that have some sort of focus/center on uplifting women because I find that it is just easier to mesh with people and that I am more comfortable with expressing myself unfilteredly when I am not as heavily dealing with those mental barriers of feeling out of place." - 1st Year College Student</h2>
      <img src={sky} alt="sky" className="sky-img" />
      <img src={rocket} alt="rocket" className="rocket-img" />
      <img src={circle} alt="circle" className="circle-img" />
    </div>
  );
}

export default LandingPage;
