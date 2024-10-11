var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let userLogin = require('./routes/admin/UserLogin');
let productRouter = require('./routes/admin/Product');
const JWT = require('./util/JWT');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  if (req.url === '/adminapi/user/login') {
    next()
    return
  } else {
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
      let information = JWT.verify(token)
      if (information) {
        const newToken = JWT.establish({
          _id:information._id,
          name:information.name
        }, "1h")
        res.header("authorization", newToken)
        next()
      } else {
        res.status(401).send({ errCode: "-1", errorInfo: 'token过期' })
      }
    }
  }
})
app.use(userLogin);
app.use(productRouter);

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
  res.render('error');
});

module.exports = app;
