import rocket from './media/rocket.png';
import sky from './media/sky.png';
import './LandingPage.css';

const LandingPage = () => {
    return ( 
        <div className="landing-page">
            <div className="background-img">
                <div className="btns">
                    <button>login</button>
                    <button>sign up</button>
                </div>
                <img src={sky} alt="sky" className="sky-img"/>
                <img src={rocket} alt="rocket" className="rocket-img"/>
            </div>
        </div>
     );
}
 
export default LandingPage;