const express = require('express');
const app = express();

const path = require('path');

//set our view directory
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//register routing
const routes = require('./routes.js');
app.use('/', routes);

//start server
app.listen(process.env.PORT || 3000);