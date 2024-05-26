import {useState} from 'react';
import axios from 'axios';

const Search = () => {
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
        <div className="search">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
}
 
export default Search;