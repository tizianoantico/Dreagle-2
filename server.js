// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3074;
var session  = require('express-session');;
var bodyParser = require('body-parser');
var multer  = require('multer');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
//app.use(session({ secret: 'login' })); // session secret
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(multer({dest: '/tmp/'}).single('file'));

require('./routes.js')(app);
// launch ======================================================================
app.listen(port);
console.log('Server on port ' + port);