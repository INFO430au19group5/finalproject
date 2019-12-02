const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    _id: String,
    salary: Number,
    description: String,
    position: String,
    userStage: Number,
    InterviewProcess: String
});

module.exports = {
    Job: jobSchema
}