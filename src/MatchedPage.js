// import pfp from './media/pfp.png';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';


// const MatchedPage = () => {
//     const [searchParams,_] = useSearchParams();
//     console.log(searchParams.get("data"));
//     const navigation = useNavigate();
//     const location = useLocation();
//     const [name, setName] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/search?name=${name}`);
//             setResults(response.data);
//             // console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching data', error);
//         }
//     };

//     return (         
//         <div className="matched-page">
//             <div className="title">
//                 <h2>Welcome aboard!</h2>
//                 <h3>Your captain is {searchParams.get("data").replace(/"/g,"").split(",")[0].trim()}</h3>
//             </div>
//             <div className="content-holder">
//                 <img src={pfp} alt="pfp" className="pfp-img" />
//                 <h3 className="mentor-name">Jasmine!</h3>
//                 <img src={pfp} alt="pfp" className="pfp-img" />
//             </div>
//             <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Search by name"
//             />
//             <button onClick={handleSearch}>Search</button>
//             <ul>
//                 {results.map((result, index) => (
//                     <li key={index}>
//                         {result.name} - {result.socialLinks.linkedIn}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//      );
// }
 
// export default MatchedPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import pfp from './media/pfp.png';
// import './MatchedPage.css'; // Ensure you have the appropriate styles

// const MatchedPage = () => {
//     const [searchParams] = useSearchParams();
//     const [results, setResults] = useState([]);
//     const names = searchParams.get("data")?.replace(/"/g, "").split(",").map(name => name.trim());

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (names && names.length > 0) {
//                     const promises = names.slice(0, 3).map(name =>
//                         axios.get(`http://localhost:3000/search?name=${name}`)
//                     );
//                     const responses = await Promise.all(promises);
//                     const mentors = responses.map(response => response.data).flat();
//                     setResults(mentors);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data', error);
//             }
//         };

//         fetchData();
//     }, [names]);

//     return (
//         <div className="matched-page">
//             <div className="title">
//                 <h2>Welcome aboard!</h2>
//                 {names && names.length > 0 && <h3>Your mentor is {names[0]}</h3>}
//             </div>
//             <div className="content-holder">
//                 {results.map((result, index) => (
//                     <div key={index} className="mentor-card">
//                         <img src={pfp} alt="pfp" className="pfp-img" />
//                         <h3 className="mentor-name">{result.name}</h3>
//                         <p>result.bio}</p>
//                         <p>Age: {result.age}</p>
//                         <p>Current Education: {result.currentEducation}</p>
//                         <p>Contact Preference: {result.contactPreference}</p>
//                         <p>Field of Study: {result.fieldOfStudy}</p>
//                         <p>Location: {result.location}</p>
//                         <p>Interests: {result.interests.join(', ')}</p>
//                         <p>LinkedIn: https://linkedin.com/{result.socialLinks.linkedIn}</p>
//                         <p>Email: {result.socialLinks.email}</p>
//                         <p>Phone: {result.socialLinks.phone}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MatchedPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import pfp from './media/pfp.png';
import './MatchedPage.css';
import sparkleCircle from './media/title-sparkle-circle.svg';

const MatchedPage = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const names = searchParams.get("data")?.replace(/"/g, "").split(",").map(name => name.trim());

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (names && names.length > 0) {
                    const promises = names.slice(0, 3).map(name =>
                        axios.get(`http://localhost:3000/search?name=${name}`)
                    );
                    const responses = await Promise.all(promises);
                    const mentors = responses.map(response => response.data).flat();
                    setResults(mentors);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [names]);

    const renderMentorCard = (mentor, className, rank) => (
        <div className={`mentor-card ${className}`} key={mentor.name}>
            <h3 className="mentor-name">{mentor.name}</h3>
            <img className="imageAlign" src={sparkleCircle} alt="sparkle circle"></img>
            <h1 className="ranking">{rank}</h1>
            <div className="textBox">
                <p>{mentor.bio}</p>
                <p>Age: {mentor.age}</p>
                <p>Current Education: {mentor.currentEducation}</p>
                <p>Contact Preference: {mentor.contactPreference}</p>
                <p>Field of Study: {mentor.fieldOfStudy}</p>
                <p>Location: {mentor.location}</p>
                <p>Interests: {mentor.interests.join(', ')}</p>
                <p>LinkedIn: https://linkedin.com/{mentor.socialLinks.linkedIn}</p>
                <p>Email: {mentor.socialLinks.email}</p>
                <p>Phone: {mentor.socialLinks.phone}</p>
            </div>
        </div>
    );

    return (
        <div className="matched-page">
            <div className="title">
                <h2>Welcome aboard!</h2>
                {names && names.length > 0 && <h3>Your mentor is...</h3>}
            </div>
            <div className="content-holder">
                {results.length > 0 && (
                    <>
                        {results[1] && renderMentorCard(results[1], 'left', 2)}
                        {renderMentorCard(results[0], 'center', 1)}
                        {results[2] && renderMentorCard(results[2], 'right', 3)}
                    </>
                )}
            </div>
        </div>
    );
}

export default MatchedPage;

