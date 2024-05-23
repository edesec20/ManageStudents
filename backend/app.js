var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var cors = require('cors');

//Cors Options einrichten - WICHTIG: Vor den Routen erstellen
const corsOptions = {
    origin: '*', //Zugriff aller IPs erlauben
};
app.use(cors(corsOptions));




var StudentRouter = require('./routes/Student');

//******Middleware


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//TODO Meine ROUTEN in der Middleware anmelden
app.use('/student', StudentRouter);




module.exports = app;
