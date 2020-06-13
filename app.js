const express = require('express'); //npm install express
const app = express();
require('dotenv').config(); //npm install dotenv

const path = require('path');

//set our view directory
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//style sheets
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

//mongo access -- npm install mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(`Error: ${err}`));

//done after out connection but before routes
const bodyParser = require('body-parser');// npm install body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//register routing
const routes = require('./routes.js');
app.use('/', routes);

//start server
app.listen(process.env.PORT || 3000);