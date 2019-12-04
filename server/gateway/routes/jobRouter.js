const express = require('express');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const hash = crypto.createHash('sha256');

const app = express();

const { Job, User } = require('../models/Schema');

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

// retrieve job by company name
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

app.delete('/deletejobdetails/:id', (req, res, next) => {
    Job.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(400).json(err);
            return;
        }
        console.log(doc)
        res.send('Success to delete data!');
    })
});

app.post('/createjobdetails', (req, res, next) => {
    req.body._id = uuidv4();
    Job.create(req.body, (err, job) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send(job);
    })
});

app.put('/updatejobdetail', (req, res, next) => {
    Job.findByIdAndUpdate({ _id: req.params.id }, res.body, (err, model) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        console.log('success to update!')
        res.send(model);
    })
});

app.delete('/deletejobdetail', (req, res, next) => {
    Job.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        console.log('success to update!')
        res.send(data);
    })
});

// app.post('/usr/register', (req, res, next) => {
//     req.body._id = uuidv4();
//     let password = hash.update(req.body.password).digest('base64');
//     req.body.password = password
//     User.create(req.body, (err, doc) => {
//         if (err) {
//             res.status(500).json(err);
//             return;
//         }
//         res.send('Success to add user!')
//     })
// })


// app.post('/usr/login', (req, res, next) => {

// })

module.exports = app;
