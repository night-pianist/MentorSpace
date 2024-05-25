const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose'); // Import Mongoose
const Mentee = require('./models/Mentee');
const Mentor = require('./models/Mentor');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Route to handle form submission from Google Form
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Form data:', formData);

        if (formData.role === 'mentee') {
            // Save mentee data to MongoDB
            const mentee = new Mentee(formData);
            await mentee.save(); // saves to mongodb

            // Send mentee + mentor data to Gemini API along with mentor database
            const mentors = await Mentor.find();
            const geminiResponse = await axios.post('https://gemini-api.example.com/process', {
                menteeData: formData,
                mentorData: mentors
            });

            // Return ranked mentor list to frontend
            res.json({ rankedMentors: geminiResponse.data });
        } else if (formData.role === 'mentor') {
            // Save mentor data to MongoDB
            const mentor = new Mentor(formData);
            await mentor.save();

            res.json({ message: 'Mentor data saved successfully' });
        } else {
            res.status(400).json({ error: 'Invalid role specified' });
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'An error occurred while handling form submission' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
