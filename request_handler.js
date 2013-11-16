var url = require('url');
var fs = require('fs');
var http = require('http');
var pages = require('./readfile.js').pages;
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};

var getNoticeFromURL = function(req,res){
    var notice = {};
    var address = url.parse(req.url,true);
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
	res.writeHead(200, {"Content-Type":contentType.html});
	var notice = getNoticeFromURL(req,res);
	notice && addNewNotice(res,notice);
	res.write(pages.home);
	res.end();
};
var addNewNotice = function(res,notice){
    pages.noticeBoard.push(notice);
    fs.writeFile('./notice_files/dataBase/notices.json',JSON.stringify(pages.noticeBoard));
    res.write('<a href = "/see">Notice added. Click to see the NOTICE BOARD</a>');
    res.end();
}
handler['/login'] = function(req,res){
    userDetails = url.parse(req.url,true).query;
    var user = {};
    var options = {hostname: 'localhost', port: 8085,};
    user.id = userDetails.userID;
    user.passwd = userDetails.passwd;
    res.write('<a href = "/see">Notice added. Click to see the NOTICE BOARD</a>');
    (pages.loginDetails[user.id] && pages.loginDetails[user.id].passwd == user.passwd) && (home = home.replace(/none/g,'block'))&&(home = home.replace(/block/,'none')) || console.log("hi m here");
    handler['/'](req,res);
};
handler['/post'] = function(req,res){
    res.writeHead(200, {"Content-Type":contentType.html});
	res.write(pages.addNotice_html);
  	res.end();
    return 1;
};
handler['/see'] = function(req,res){
    res.writeHead(200, {"Content-Type":contentType.html});
    var notices = [];
    pages.noticeBoard.reverse();
  	pages.noticeBoard.forEach(function(notice,index){
	    notice = "ID : " + (index + 1) + '\n' +
	    "Author : " + notice.sender + '\n' +
	    "Date : " + notice.date + '\n' +
	    "Subject : " + notice.subject + '\n' + 
	    notice.message + '\n';
        notice = notice.replace(/\n/g,'<br/>');
        notices.push(notice);
  	});
    res.write(pages.viewnotice.replace(/{TEXT}/,notices.join('<br/>')));
  	res.end();
};
handler['/images/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(pages.bg_jpg); 
  	res.end();	
};
handler['/signUp'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(pages.signUp);
    res.end();
}
handler['/signUpInfo'] = function(req,res){
    var errorMsg="Pas<div id=\"reg_error_inner\" class=\"_58mo\">";
    var errorlength = errorMsg.length+37;
    var  userInfo= {};
    var address = url.parse(req.url,true);
    (address.query.Npwd!=address.query.Cpwd)&& (errorMsg += " password ");
    (address.query.Email!=address.query.cEmail)&& (errorMsg += " Email Address ");
    errorMsg += "do not match. Please try again.</div>"
    res.writeHead(200,{'Content-Type': contentType.html});
    if(errorlength<errorMsg.length)   
        res.write(pages.signUp.replace(/{Error}/,errorMsg));
    else{
        userInfo.uName = address.query.uName;
        userInfo.PassWord = address.query.Npwd;
        userInfo.Email = address.query.Email;
        pages.loginDetails.push(userInfo);
        fs.writeFile('./notice_files/dataBase/loginDetails.json',JSON.stringify(pages.loginDetails));      
        res.write("working");   
    }
    res.end();
    return 0;
};
handler['/logout'] = function(req,res){
    (home = home.replace(/block/g,'none'))&&(home = home.replace(/none/,'block'));
    res.write(home);
    res.end();
}
exports.path = handler;
