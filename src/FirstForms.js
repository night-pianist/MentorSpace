import { useState } from "react";
import './Forms.css';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const FirstForms = () => {
    const [mentorStatus, setMentorStatus] = useState('mentor');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const status = { mentorStatus };

        console.log(status);
        if (mentorStatus === "mentor") 
            navigate("/mentor-form");
        else {
            navigate("/mentee-form");
        }
    }

    return ( 
        <div className="form">
            <h2>WELCOME!</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , width: '400px', margin: '0 auto' }}>
                <label>ARE YOU A MENTOR OR MENTEE?</label>
                <select
                value={mentorStatus}
                onChange={(e) => setMentorStatus(e.target.value)}
                >
                    <option value="mentor">Mentor</option>
                    <option value="mentee">Mentee</option>
                </select>
                
                <button onClick={handleSubmit} type="submit">Submit</button>
                
            </form>
        </div>
    );
}

export default FirstForms;