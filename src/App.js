import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import LandingPage from './LandingPage';
import AfterLoginPage from './AfterLoginPage';
import MatchedPage from './MatchedPage';
import Search from './Search';
import Forms from './Forms';
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
        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/after-login" element={<AfterLoginPage />} /> */}
        {/* Add other routes if needed */}
        <Route path="/" element={<Forms />} />
      </Routes>
    </Router>
  </KindeProvider>
);

export default App;
