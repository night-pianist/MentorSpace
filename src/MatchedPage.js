import pfp from './media/pfp.png';
// const rankedMentors = require('./fileWhereRankedListIsDefined');

const MatchedPage = () => {
    return (         
        <div className="matched-page">
            <div className="title">
                <h2>Welcome aboard!</h2>
                <h3>Your captain is...</h3>
            </div>
            <div className="content-holder">
                <img src={pfp} alt="pfp" className="pfp-img" />
                <h3 className="mentor-name">Jasmine!</h3>
                <img src={pfp} alt="pfp" className="pfp-img" />
            </div>
        </div>
     );
}
 
export default MatchedPage;