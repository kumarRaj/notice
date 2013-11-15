var fs = require('fs');
var url = require('url');
var home = fs.readFileSync("home.html",'utf-8');

home = home.replace(/{status}/,"display:none;");
var loginDetails = JSON.parse(fs.readFileSync("loginDetails.json"));
var addNotice = fs.readFileSync('addnotice.html');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
var bg_jpg = fs.readFileSync('./bg.jpg');
var getNotice = function(req,res){
    var notice = {};
    address = url.parse(req.url,true);
    notice.sender = address.query.author;
    notice.subject = address.query.subject;
    notice.message = address.query.message;
    notice.date = new Date();
    if(notice.sender && notice.subject && notice.message && notice.date)
	    return notice;
    return 0;
}
var handler = {};
	handler['/'] = function(req,res){
	res.writeHead(200, {"Content-Type":"text/html"});
	var notice = getNotice(req,res);
	notice && addNewNotice(res,notice);
	res.write(home);
	res.end();
};
var addNewNotice = function(res,notice){
	var notices = fs.readFileSync('notices.txt');
    noticeBoard = JSON.parse(notices);
    noticeBoard.push(notice);
    fs.writeFileSync('notices.txt',JSON.stringify(noticeBoard));
    res.write('<a href = "/see">Notice added. Click to see the NOTICE BOARD</a>');
    res.end();
}
handler['/login'] = function(req,res){
    userDetails = url.parse(req.url,true).query;
    var user = {};
    // var hide = ;
    // var show = 'div id = "loggedInOptions" style="display: block;"'
    user.id = userDetails.userID;
    user.passwd = userDetails.passwd;
    console.log(loginDetails,user.id);
    (loginDetails[user.id] && loginDetails[user.id].passwd == user.passwd) && (home = home.replace(/none/,'block'))||alert("Invalid credentials");
    console.log(home);
    handler['/'](req,res);
}
handler['/post'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
	res.write(addNotice);
  	res.end();	
    return 1;
};
handler['/see'] = function(req,res){
	var notices = fs.readFileSync('notices.txt');
 	noticeBoard = JSON.parse(notices);
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write("NOTICE BOARD"+'\n\n');
    noticeBoard.reverse();
  	noticeBoard.forEach(function(notice,index){
	    res.write("ID : " + (index + 1) + '\n');
	    res.write("Author : " + notice.sender + '\n');
	    res.write("Date : " + notice.date + '\n');
	    res.write("Subject : " + notice.subject + '\n');
	    res.write(notice.message + '\n\n');
  	});
  	res.end();	

};
handler['/bg.jpg'] = function(req,res){
	  res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(bg_jpg); 
  	res.end();	
};
exports.path = handler;
