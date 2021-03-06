const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { mongoURI } = require('./keys');
const userRoutes = require('./models/User/routes');
const postRoutes = require('./models/Posts/routes');
const schoolRoutes = require('./models/Schools/routes');
const saleRoutes = require('./models/Sales/routes');

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

app.use('/', [userRoutes, postRoutes, schoolRoutes, saleRoutes]);

app.listen(3000, () => {
    console.log('app is running on port 3000');
})