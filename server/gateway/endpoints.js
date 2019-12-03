const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jobRouter = require('./routes/jobRouter');

const mongouri =
    'mongodb+srv://dbUser:dbUser@cluster0-iic9m.mongodb.net/info430?retryWrites=true&w=majority';
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser: true
};
mongoose.connect(mongouri, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback() {
    console.log('Successfully connected!');
});
mongoose.Promise = global.Promise;
const app = express();

app.use(express.json()); // Make sure it comes back as json
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect
app.use(jobRouter);

module.exports.app = serverless(app);
