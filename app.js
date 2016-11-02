var path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser');
    
var indexRoutes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server has started!');
});