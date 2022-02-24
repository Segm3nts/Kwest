// Initialise all our packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');

// Initialise routes
var indexRouter = require('./routes/index');
var entryRouter = require('./routes/entry');
var journalRouter = require('./routes/journal');
var compendiumRouter = require('./routes/compendium');

// Initialise MySQL connection pool
var dbConnectionPool = mysql.createPool({
  host: "localhost",
  database: "kwest"
});

// Create an Express instance
var app = express();

// Add database pool to request
app.use(function(req, res, next){
  req.pool = dbConnectionPool;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use third party middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "my kwest secret",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Use static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/entry', entryRouter);
app.use('/journal', journalRouter);
app.use('/compendium', compendiumRouter);

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

module.exports = app;
