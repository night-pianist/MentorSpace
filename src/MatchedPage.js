import pfp from './media/pfp.png';
import {useState} from 'react';
import axios from 'axios';


const MatchedPage = () => {
    const [name, setName] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search?name=${name}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (         
        <div className="matched-page">
            <div className="title">
                <h2>Welcome aboard!</h2>
                <h3>Your captain is...</h3>
            </div>
            <div className="content-holder">
                <img src={pfp} alt="pfp" className="pfp-img" />
                <h3 className="mentor-name">Jasmine!</h3>
                <h5 className="mentor-des">more info about ur mentor</h5>
                <img src={pfp} alt="pfp" className="pfp-img" />
            </div>
            <button onClick={printRankedMentors}>press</button>
        </div>
     );
}
 
export default MatchedPage;