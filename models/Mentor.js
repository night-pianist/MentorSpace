// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    age: Number,
    currentEducation: String,
    contactPreference: String,
    fieldOfStudy: String,
    location: String,
    careerAspirations: String,
    interests: [String],
    socialLinks: {
      linkedIn: String,
      email: String,
      phone: String,
  },
    role: String,
});

module.exports = mongoose.model('Mentor', mentorSchema);