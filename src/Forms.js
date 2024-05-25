import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Forms = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    
    const handleSubmit = (e) => {
        
    }

    return ( 
        <div className="form">
            <h2>survey</h2>
            <form onSubmit={handleSubmit}>
                <h2>name</h2>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Forms;