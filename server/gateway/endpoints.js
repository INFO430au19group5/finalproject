const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0-iic9m.mongodb.net/test?retryWrites=true&w=majority',
    { useCreateIndex: true, useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback() {
    console.log('Conntected To Mongo Database');
});

const getJobService = require('./services/getJobservice');
const postJobService = require('./services/postJobService');
const updateJobService = require('./services/updateJobService');
const deleteJobService = require('./services/deleteJobService');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to mongodb

app.get('/getjobdetailsbyid', getJobService.getJobDetailsById);
app.get('/getjobdetailsbyname', getJobService.getJobDetailsByName);
app.delete('/deletejobdetail', deleteJobService.deleteJobDetail);
app.post('/postjobdetail', postJobService.postJobDetail);
app.put('/updatejobdetail', updateJobService.updateJobDetail);

module.exports.handler = serverless(app);
