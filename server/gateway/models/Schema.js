const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    company: String,
    salary: Number,
    stipend: String,
    position: String,
    stages: Number,
    process: [String]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = {
    Job: Job
};