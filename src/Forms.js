import { useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
//import './Forms.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forms = () => {
    const navigation = useNavigate();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [edu, setEdu] = useState('undergrad'); // options: undergrad, grad, master, phd
    const [contact, setContactPref] = useState('');
    const [major, setMajor] = useState('undeclared'); // options: CS, CE, EE, ME, AE, CivE, BE, ChemE, EnvE, undeclared/unsure
    const [location, setLocation] = useState(''); // input for location
    const [career, setCareer] = useState('');
    const [interests, setInterests] = useState('');
    const [linkedin, setLinkedIn] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phonenum, setPhoneNumber] = useState(''); 
    // const [isPending, setIsPending] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
          name: name,
          bio: bio,
          age: age,
          currentEducation: edu,
          contactPreference: contact,
          fieldOfStudy: major,
          location: location,
          careerAspirations: career,
          interests: interests, // Assuming interests are comma-separated
          socialLinks: { linkedIn: linkedin, email: email, phone: phonenum },
          role: 'mentee'
        };
    
        const options = {
          method: 'POST',
          url: 'http://localhost:3000/submit-form',
          headers: { 'Content-Type': 'application/json' },
          data: formData
        };
    
        axios.request(options)
          .then(response => {
            console.log(response.data);
            // navigation.state = response.data;
            // navigation.formAction = navigation.location."./MatchedPage";
            
             navigation('./MatchedPage?data='+encodeURIComponent(response.data.message)+'');
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    return ( 
        <div className="form">
            <h2>Preferences</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , width: '400px', margin: '0 auto' }}>
                <label>Name</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Bio/Info</label>
                <textarea 
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <label>Age</label>
                <input 
                    type="text"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label>Current Education</label>
                <select
                value={edu}
                onChange={(e) => setEdu(e.target.value)}
                >
                    <option value="undergrad">Undergraduate</option>
                    <option value="grad">Graduate</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                </select>
                <label>Contact Preferences</label>
                <select
                value={contact}
                onChange={(e) => setContactPref(e.target.value)}
                >
                    <option value="any">No Preference</option>
                    <option value="messages">Messages</option>
                    <option value="email">Email</option>
                    <option value="discord">Discord</option>
                    <option value="insta">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="virtual-call">Virtual Call</option>
                </select>
                <label>Major</label>
                <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                >
                    <option value="undeclared">Undeclared/Unsure</option>
                    <option value="cs">Computer Science</option>
                    <option value="compE">Computer Engineering</option>
                    <option value="elecE">Electrical Engineering</option>
                    <option value="mechE">Mechanical Engineering</option>
                    <option value="aeroE">Aerospace Engineering</option>
                    <option value="civE">Civil Engineering</option>
                    <option value="envE">Environmental Engineering</option>
                    <option value="bioE">Biomedical Engineering</option>
                    <option value="chemE">Chemical Engineering</option>
                    <option value="matE">Materials Engineering</option>
                    <option value="indE">Industrial Engineering</option>
                    <option value="nanoE">Nanoengineering</option>
                </select>
                <label> Location</label>
                <input 
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter location"
                />
                <label>Career Aspirations</label>
                <input 
                    type="text"
                    required
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                />
                <label>Interests/Hobbies</label>
                <input 
                    type="text"
                    required
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                />
                <label>LinkedIn</label>
                <input 
                    type="text"
                    required
                    value={linkedin}
                    onChange={(e) => setLinkedIn(e.target.value)}
                />
                <label>Email</label>
                <input 
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone Number</label>
                <input 
                    type="text"
                    required
                    value={phonenum}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Forms;