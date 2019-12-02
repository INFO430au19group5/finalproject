const express = require('express');

const app = express();
const { Job } = require('../models/Schema');
const uuidv4 = require('uuid');

app.get('/getjobdetails', (req, res, next) => {
    Job.find({}, function (err, docs) {
        if (!err) {
            res.send(docs);
        } else {
            res.status(500).json(err);
            return;
        }
    });

});
app.get('/getjobdetailsbyname', (req, res, next) => {
    const name = req.query.name;
    Job.find({ company: name }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(500).json(err);
            return;
        }
    })
});

app.delete('/deletejobdetail/:id', (req, res, next) => {
    Job.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.send('Success to delete data!')
    })
});

app.post('/postjobdetail', (req, res, next) => {
    req.body._id = uuidv4();
    Job.create(req.body, (err, job) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send(job);
    })
});

// app.put('/updatejobdetail', (req, res, next) => {

// });

module.exports = app;
