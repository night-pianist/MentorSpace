const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    bio: String,
    age: { type: Number, required: true },
    currentEducation: String,
    fieldOfStudy: { type: String, default: 'Undeclared/unsure' },
    location: String,
    contactPreference: { type: String, enum: ['messaging', 'virtual call'], required: true },
    interests: [String],
    socialLinks: {
        linkedIn: String,
        instagram: String
    },
    role: { type: String, enum: ['mentor', 'mentee'], required: true },
    careerAspirations: [String],
    priorityRanking: {
        fieldOfStudy: { type: Number, default: 1 },
        location: { type: Number, default: 1 },
        contactPreference: { type: Number, default: 1 },
        careerAspirations: { type: Number, default: 1 },
        interests: { type: Number, default: 1 },
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;