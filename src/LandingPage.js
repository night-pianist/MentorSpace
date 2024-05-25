import rocket from './media/rocket.png';

const LandingPage = () => {
    return ( 
        <div className="landing-page">
            <div className="btns">
                <button>login</button>
                <button>sign up</button>
            </div>
            <div className="img-container">
                <img src={rocket} alt="rocket" className="rocket-img"/>
            </div>
        </div>
     );
}
 
export default LandingPage;