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
    process: [String]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = {
    Job: Job
};
