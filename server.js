if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const bodyParser = require ('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));  // use to link the static files such as css file, images etc
app.use(bodyParser.urlencoded({limit: '10mb',extended: false})); // Here making the file limit to be uploaded
// on server to be of 10 mb maximum

app.use('/',indexRouter);
app.use('/authors', authorRouter);

// Integrating the application to the MongoDB using Mongoose

mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() => console.log('Connected to Mongoose'));
app.listen(process.env.PORT || 3000);