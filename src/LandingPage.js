import rocket from './media/rocket.png';
import sky from './media/sky.png';
import './LandingPage.css';

const LandingPage = () => {
    return ( 
        <div className="landing-page">
            <div className="btn-container">
                <button>login</button>
                <button>sign up</button>
            </div>
            <img src={sky} alt="sky" className="sky-img"/>
            <img src={rocket} alt="rocket" className="rocket-img"/>
        </div>
     );
}
 
export default LandingPage;