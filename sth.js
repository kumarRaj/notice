var fs = require('fs');
var url = require('url');
var http = require('http');
var home = fs.readFileSync("./notice_files/html/home.html",'utf-8');


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
    var onNotice = function(err,data){
        if(err) res.write('Not present');
        var noticeBoard = JSON.parse(data) || [];
        noticeBoard.push(notice);
        fs.writeFile('./notice_files/dataBase/notices.json',JSON.stringify(noticeBoard));
    }
    fs.readFile('./notice_files/dataBase/notices.json','utf-8',onNotice);
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
handler['/post'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
	res.write(addNotice);
  	res.end();	
    return 1;
};
handler['/see'] = function(req,res){

	
    var notices = fs.readFileSync('./notice_files/dataBase/notices.json');
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
handler['/images/bg.jpg'] = function(req,res){
	  res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(bg_jpg); 
  	res.end();	
};
exports.path = handler;
