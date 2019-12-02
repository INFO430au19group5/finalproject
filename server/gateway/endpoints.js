const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const getJobService = require('./services/getJobservice');
const postJobService = require('./services/postJobService');
const updateJobService = require('./services/updateJobService');
const deleteJobService = require('./services/deleteJobService');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect to mongodb
mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0-iic9m.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });


app.get('/getjobdetailsbyid', getjobService);
app.post('/getjobdetailsbyname', getjobService);
app.delete('/deletejobdetail', jobService);
app.post()


module.exports.handler = serverless(app);