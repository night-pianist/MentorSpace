const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mentorship', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/match', async (req, res) => {
    try {
        const mentees = await User.find({ role: 'mentee' });
        const mentors = await User.find({ role: 'mentor' });

        const matches = [];

        mentees.forEach(mentee => {
            const { priorityRanking } = mentee;
            const menteePrioritySum = Object.values(priorityRanking).reduce((a, b) => a + b, 0);

            mentors.forEach(mentor => {
                let score = 0;

                if (mentee.fieldOfStudy === mentor.fieldOfStudy) score += priorityRanking.fieldOfStudy;
                if (mentee.location === mentor.location) score += priorityRanking.location;
                if (mentee.contactPreference === mentor.contactPreference) score += priorityRanking.contactPreference;
                if (mentee.careerAspirations.some(ca => mentor.careerAspirations.includes(ca))) score += priorityRanking.careerAspirations;
                if (mentee.interests.some(interest => mentor.interests.includes(interest))) score += priorityRanking.interests;

                const normalizedScore = (score / menteePrioritySum) * 100;

                matches.push({
                    mentee: mentee.name,
                    mentor: mentor.name,
                    match_score: normalizedScore
                });
            });
        });

        matches.sort((a, b) => b.match_score - a.match_score);
        res.json(matches);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
