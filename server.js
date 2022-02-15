// All server code

// Load all config enviroment variables from .env
require('dotenv').config(); 


// requires
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');



// connect mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// if problem connecting to db, print error
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to db'));


// set the view engine to ejs
app.set('view engine', 'ejs');


  

// Use any middleware that runs once server gets a request, but before its passed to our routes
// Use express.json as build in middleware to parse incomming requests with JSON payloads
app.use(express.json())


// routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const countriesRouter = require('./routes/countries')
app.use('/countries', countriesRouter);
// set port and console.log on connection
app.listen(3000, () => console.log('Server started'));

