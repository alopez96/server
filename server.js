const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Mongodb running')) //successful
    .on('error', err => console.log(err)); //error connecting

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev')); //debugging for HTTP requests

app.get('/', (req, res) => {
    res.send('this is working');
})

//register user
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) });

app.listen(3000, () => {
    console.log('app is running on port 3000');
})