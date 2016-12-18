var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var flash = require('connect-flash');
var session = require('express-session');


// global vars
global.dev = "true";

var db = require('./db')

//Connect to MongoDB
db.connect("mongodb://localhost:27017/local", function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
  } else {
      console.log('Connected to mongodb')
  }
})

var routes = require('./routes/index');


// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Connect Flash
app.use(flash());



// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//This redirects any url with '/' to index.js and reroutes appropriately.
app.use('/', routes);

// set custom validators for express-validator
app.use(expressValidator({
 customValidators: {
    match: function(value, regexp) {
        return value.search(regexp) >= 0;
    },
    alwaysFire: function(value) {
        return false;
    }
 }
}));

// Set Port
app.set('port', (process.env.PORT || '3000'));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
