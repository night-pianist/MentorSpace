import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import LandingPage from './LandingPage';
import AfterLoginPage from './AfterLoginPage';
import FirstForms from './FirstForms'
import MenteeForms from './MenteeForms';
import MentorForms from './MentorForms';

// import other components if needed

const App = () => (
  <KindeProvider
    clientId="7976ca998c64493aa23e2b14d51b87d8"
    domain="https://mentorspace.kinde.com"
    redirectUri="http://localhost:3000"
    logoutUri="http://localhost:3000"
  >
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/after-login" element={<AfterLoginPage />} />
        <Route path="/first-form" element={<FirstForms />} />
        <Route path="/mentee-form" element={<MenteeForms />} />
        <Route path="/mentor-form" element={<MentorForms />} />
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  </KindeProvider>
);

export default App;

{/* <div className="App">
        <switch>
          <Route exact path="/"> 
            <LandingPage />
          </Route>
          <Route exact path="/forms"> 
            <Navbar />
            <Forms />
          </Route>
        </switch>
      </div>
    </Router> */}