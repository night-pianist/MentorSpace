import { useState } from "react";
import './Forms.css';
// import { useHistory } from 'react-router-dom';

const FirstForms = () => {
    const [mentorStatus, setMentorStatus] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const status = { mentorStatus };

        console.log(status);
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
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FirstForms;