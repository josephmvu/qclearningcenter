var path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash');
    
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// setup passport
app.use(session({
    secret: 'this is not a good secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler (will print stacktrace)
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// production error handler (no stacktraces leaked to user)
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

app.listen(process.env.PORT, () => {
    console.log('Server has started!');
});