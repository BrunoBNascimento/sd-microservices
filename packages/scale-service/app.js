var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 3000
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port);

const ascii = `scale-service is running on port: ${port}               
.d8888b   .d8888b  8888b.  888  .d88b.  .d8888b   .d88b.  888d888 888  888 888  .d8888b .d88b.  
88K      d88P"        "88b 888 d8P  Y8b 88K      d8P  Y8b 888P"   888  888 888 d88P"   d8P  Y8b 
"Y8888b. 888      .d888888 888 88888888 "Y8888b. 88888888 888     Y88  88P 888 888     88888888 
   Y88b.    888   888 888 Y8b.  X88           888 Y8b      d8P      888 88b.Y8b. 888 
88888P'  "Y8888P  "Y888888 888  "Y8888   88888P'  "Y8888   888       Y88P    888  "Y8888P "Y8888`
console.log(ascii)

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
