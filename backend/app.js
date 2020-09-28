const typeDefs = require('./config/typeDef')
const express = require('express')
const app = express()
const routes = require('./routes/index.js');
const config = require('./config/global.js');
const bodyParser = require('body-parser');
const parseWithoutProcessing = require('handlebars');
var createError = require('http-errors');


var cors = require('cors')
var path = require('path');

// for session and cookies
var cookieParser = require('cookie-parser');    
var session = require('express-session')
var cookieParser = require('cookie-parser')
var logger = require('morgan');
const logPattern = ':remote-addr | :method | :url | :status | :response-time'

//app.use(expressValidator())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(logPattern));
app.use(cookieParser());
app.set('trust proxy', 1)
app.use(session({
    secret: 'fjkdfgfuysdfugdgi',
    saveUninitialized: true,
    resave: true,
    // cookie: {
    //     secure: false,
    //     httpOnly: true,
    //     maxAge: 60000
    // },
}));

app.use(express.static(path.join(__dirname, 'demoAngular')));

//install mongoose
var mongoose = require('mongoose');
mongoose.connect(config.database.mongoURL, { useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected");
});



const localIP = 'localhost';
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + localIP + ':4200');
    //res.setHeader('Access-Control-Allow-Origin', 'http://'+localIP+':3000, http://localhost')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});

routes(app);

app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/demoAngular/index.html')
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error')

})

module.exports = app