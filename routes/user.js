var users = require('./users').profiles;
var fs = require('fs'); 
var NoticesExists = fs.existsSync('./routes/notices.json');
var notices =NoticesExists && 
      JSON.parse(fs.readFileSync('./routes/notices.json','utf-8')) ||[];
var visitHome = function(profile, req, res){     
	var minute = 60000;
	console.log("profile",profile);
	res.cookie('userid',profile.id,{ maxAge: minute });
	res.redirect('/home');
};
var visitLogin = function(req, res){
	res.clearCookie('userid');
	res.redirect('/login.html');
};

exports.login = function(req,res){
	var userID = req.body.userID, password = req.body.password;
	var profile = users[userID];
	var isValid = profile && profile.password === password;
	if(isValid) visitHome(profile,req,res);
	else visitLogin(req,res);	
};

exports.home = function(req, res){ 
    console.log('cookie',req.cookie);
    var userId = req.headers.cookie &&
    req.headers.cookie.split('=')[1];     
    var profile =  userId && users[userId];
	if(profile) res.render('home',{notices:notices});     
	else  visitLogin(req,res); 
}; 
exports.add_notice = function(req, res){     
	var notice = req.body;
	console.log(notice);     
	notice.time = new Date();     
	notice.sender =req.headers.cookie.split('=')[1];     
	notices.unshift(notice);
	fs.writeFile('./routes/notices.json',JSON.stringify(notices));
	res.redirect('/home'); 
};
exports.logout = function(req,res){
	visitLogin(req,res);
};

