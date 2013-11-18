var nodemailer = require('nodemailer');
var mailSender = require('./mailSender.js').mailSender;
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
};
var addNewNotice = function(res,notice){
    pages.noticeBoard.push(notice);
    fs.writeFile('./notice_files/dataBase/notices.json',JSON.stringify(pages.noticeBoard));
    res.write('<a href = "/see">Notice added. Click to see the NOTICE BOARD</a>');
    res.end();
};
var handler = {};
handler['/back.jpg'] = function(req,res){
    res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(pages.back_jpg); 
    res.end();  
};
handler['/images/bg.jpg'] = function(req,res){
    res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(pages.bg_jpg); 
    res.end();  
};
handler['/sth.css'] = function(req,res){
    res.writeHead(200,{'Content-Type': contentType.css});
    res.write(pages.sth_css); 
    res.end();  
};
handler['/'] = function(req,res){
    res.writeHead(200, {"Content-Type":contentType.html});
    var notice = getNoticeFromURL(req,res);
    notice && addNewNotice(res,notice);
    res.write(pages.home);
    res.end();
};
handler['/login'] = function(req,res){
    userDetails = url.parse(req.url,true).query;
    var options = {hostname: 'localhost', port: 8085,};
    var user = {};
    user.id = userDetails.userID;
    user.password = userDetails.password;
    pages.loginDetails[user.id] && 
        (pages.loginDetails[user.id].password == user.password) && 
        (pages.home = pages.home.replace(/none/g,'block'))&&
        (pages.home = pages.home.replace(/block/,'none')) || console.log("hi m here");
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
handler['/logout'] = function(req,res){
    (pages.home = pages.home.replace(/block/g,'none'))&&(pages.home = pages.home.replace(/none/,'block'));
    res.write(pages.home);
    res.end();
}
handler['/signUp'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(pages.signUp);
    res.end();
}
handler['/signUpInfo'] = function(req,res){
    res.writeHead(200,{'Content-Type': contentType.html});
    var errorMsg="passwords or Email Addresses do not match";
    var address = url.parse(req.url,true);
    if(address.query.Npwd!=address.query.Cpwd || address.query.Email!=address.query.cEmail){
        (pages.signUp = pages.signUp.replace(/none/,"block")) && 
            (pages.signUp =pages.signUp.replace(/{Error}/,errorMsg));
        res.write(pages.signUp);
    }
    else{
        userID = address.query.uName;
        pages.loginDetails[userID] = {};
        pages.loginDetails[userID].password = address.query.Npwd;
        pages.loginDetails[userID].email = address.query.Email;
        fs.writeFile('./notice_files/dataBase/loginDetails.json',JSON.stringify(pages.loginDetails));
        mailSender.transport.sendMail(mailSender.message, function(error){
            if(error){
                console.log('Error occured\r\n'+error.message);
                return;
            }
        });
        res.write(pages.home);   
    }
    res.end();
    return 0;
};
exports.path = handler;