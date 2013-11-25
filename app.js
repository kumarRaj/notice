var express = require('express');
var http = require('http');
var path = require('path');
var user_routes = require('./routes/user');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used 
// for signing the cookies.
// app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/',function(req,res){res.reirect('/home');});
app.post('/login',user_routes.login);
app.get('/home',user_routes.home);
app.post('/add_notice',user_routes.add_notice);
app.get('/logout',user_routes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
