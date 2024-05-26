import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './MatchedPage.css';
import sparkleCircle from './media/title-sparkle-circle.svg';
import logo from './media/logo.svg'
import { Link, useNavigate,} from 'react-router-dom';

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
            <Link to="/after-login" className="home-link">
                <img src={logo} alt="Home" className="home-icon" />
            </Link>
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

