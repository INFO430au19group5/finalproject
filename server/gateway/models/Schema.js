const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    company: String,
    salary: String,
    stipend: String,
    position: String,
    stages: String,
    process: [String],
    date: { type: Date, default: Date.now },
    userId: {
        type: String,
        required: true,
        default: "random user"
    }
});

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
})

const Job = mongoose.model('Job', jobSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Job: Job,
    User: User
};
