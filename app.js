var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var bodyParser = require("body-parser");
var session = require("express-session");

var sessionStore = require('./libs/sessionStore');





var config = require("config");
//var log = require('libs/log')(module);
var app = express();
app.use(session({
    secret: config.get('session:secret'),
    store: sessionStore,
    cookie: {
        "path": "/",
        "httpOnly": true,
        "maxAge": 12090000000
    },
    resave: false,
    saveUninitialized: false,
    key: config.get('session:key')
}));

app.set('port', config.get('port'));


app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


require('./routes/index')(app);
app.use(express.static(path.join(__dirname, 'public')));






// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Server is running on port: ' +config.get('port'));


});
require('./socket/index')(server, session);





module.exports = app;
