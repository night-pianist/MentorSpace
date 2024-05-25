import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Forms from './Forms';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
// import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Forms />
    </div>
  );
}

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