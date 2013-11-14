var fs = require('fs');
var url = require('url');
var home = fs.readFileSync("home.html");
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
    return 0 
    // return notice;
}
var handler = {};
	handler['/'] = function(req,res){
	res.writeHead(200, {"Content-Type":"text/html"});
	var notice = getNotice(req,res);
	if(notice){
		addNewNotice(res,notice);
	}
	res.write(home);
	res.end();
};
var addNewNotice = function(res,notice){
	var notices = fs.readFileSync('notices.txt');
	// console.log(notice);
    noticeBoard = JSON.parse(notices);
    noticeBoard.push(notice);
    fs.writeFileSync('notices.txt',JSON.stringify(noticeBoard));
    res.write('<a href = "http://10.4.31.199:8085/see">Notice added. Click to see the NOTICE BOARD</a>');
    res.end();
}
handler['/post'] = function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
	res.write(addNotice);
  	res.end();	
};
handler['/see'] = function(req,res){
	var notices = fs.readFileSync('notices.txt');
 	noticeBoard = JSON.parse(notices);
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write("NOTICE BOARD"+'\n\n');
    noticeBoard.reverse();
 	// console.log(noticeBoard);
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