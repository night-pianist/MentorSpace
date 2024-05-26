// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const mongoose = require('mongoose'); // Import Mongoose
// const Mentee = require('./models/Mentee');
// const Mentor = require('./models/Mentor');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Route to handle form submission from Google Form
// app.post('/submit-form', async (req, res) => {
//     try {
//         const formData = req.body;
//         console.log('Form data:', formData);

//         if (formData.role === 'mentee') {
//             // Save mentee data to MongoDB
//             const mentee = new Mentee(formData);
//             await mentee.save();

//             // Send mentee data to Gemini API along with mentor database
//             const mentors = await Mentor.find();
//             const geminiResponse = await axios.post('https://gemini-api.example.com/process', {
//                 menteeData: formData,
//                 mentorData: mentors
//             });

//             // Return ranked mentor list to frontend
//             res.json({ rankedMentors: geminiResponse.data });
//         } else if (formData.role === 'mentor') {
//             // Save mentor data to MongoDB
//             const mentor = new Mentor(formData);
//             await mentor.save();

//             res.json({ message: 'Mentor data saved successfully' });
//         } else {
//             res.status(400).json({ error: 'Invalid role specified' });
//         }
//     } catch (error) {
//         console.error('Error handling form submission:', error);
//         res.status(500).json({ error: 'An error occurred while handling form submission' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mentee = require('./models/Mentee');
const Mentor = require('./models/Mentor');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyAqUCPu2C3BrFCf2urbF6aksW_bRs0prjc");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to get ranked list
async function getRankedList(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        // Here, we assume the result text contains the ranked list in some format.
        // Parsing and structuring it as needed
        return text;
    } catch (error) {
        console.error('Error generating ranked list:', error);
        throw error;
    }
}

// Route to handle form submission from Google Form
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Form data:', formData);

        if (formData.role === 'mentee') {
            // Save mentee data to MongoDB
            const mentee = new Mentee(formData);
            await mentee.save();

            // Get mentor data from MongoDB
            const mentors = await Mentor.find();

            const prompt_path = './prompt.txt';
            const fs = require('fs');
            const message = fs.readFileSync(prompt_path, 'utf8');
            // const message = 'You are an expert AI-driven matcher, matching mentees to mentors. Your primary task is to take in data and match mentors to a mentee based on data from the database and return a ranking of mentors. The ranking will be in order of how well they match with the mentee. Give me just the list of the mentors ranked from best to worst. no other descriptions at all. Here is the data:';


            // Construct the prompt for the Gemini API
            const prompt = message + `Mentee: ${JSON.stringify(formData)}\nMentors: ${JSON.stringify(mentors)}`;

            // Send data to Google Generative AI and get the ranked list
            const rankedMentors = await getRankedList(prompt);
            // module.exports = rankedMentors; // export the module
            res.json({ message: rankedMentors });
            // console.log(rankedMentors);
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

// Route to search mentors
app.get('/search', async (req, res) => {
    const name = req.query.name;
    try {
        const entries = await Mentor.find({ name: new RegExp(name, 'i') }); // case-insensitive search
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});