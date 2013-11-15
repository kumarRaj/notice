var fs = require('fs');
var url = require('url');
var http = require('http');
var home = fs.readFileSync("./notice_files/html/home.html",'utf-8');
var viewnotice = fs.readFileSync("./notice_files/html/viewNotice.html",'utf-8')
var noticeBoard = fs.existsSync && JSON.parse(fs.readFileSync('./notice_files/dataBase/notices.json','utf-8')) || [];
home = home.replace(/{status}/,"display:none;");
var loginDetails = JSON.parse(fs.readFileSync("./notice_files/dataBase/loginDetails.json"));
var addNotice = fs.readFileSync('./notice_files/html/addnotice.html');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
var bg_jpg = fs.readFileSync('./notice_files/images/bg.jpg');
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
    noticeBoard.push(notice);
    fs.writeFile('./notice_files/dataBase/notices.json',JSON.stringify(noticeBoard));
    res.write('<a href = "/see">Notice added. Click to see the NOTICE BOARD</a>');
    res.end();
}
handler['/login'] = function(req,res){
    userDetails = url.parse(req.url,true).query;
    var user = {};
    var options = {hostname: 'localhost',
                port: 8085,
    };
    user.id = userDetails.userID;
    user.passwd = userDetails.passwd;
    console.log(loginDetails,user.id);
    (loginDetails[user.id] && loginDetails[user.id].passwd == user.passwd) && (home = home.replace(/none/,'block'))||alert("Invalid credentials");
    http.request(options);
    handler['/'](req,res);
}

handler['/see'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
    var notices = [];
    noticeBoard.reverse();
  	noticeBoard.forEach(function(notice,index){
	    notice = "ID : " + (index + 1) + '\n' +
	    "Author : " + notice.sender + '\n' +
	    "Date : " + notice.date + '\n' +
	    "Subject : " + notice.subject + '\n' + 
	    notice.message + '\n';
        // console.log(notice);
        notice = notice.replace(/\n/g,'<br/>');
        notices.push(notice);
  	});
    res.write(viewnotice.replace(/{TEXT}/,notices.join('<br/>')));
  	res.end();	

};
handler['/images/bg.jpg'] = function(req,res){
	  res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(bg_jpg); 
  	res.end();	
};
exports.path = handler;
