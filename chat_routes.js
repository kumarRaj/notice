var url = require('url');
var fs = require('fs');
var msgFileName = 'messages.json';
var messages = fs.existsSync(msgFileName) && JSON.parse(fs.readFileSync(msgFileName,"utf-8")) || [];
var template = fs.readFileSync('./template.html',"utf-8");
var bg_jpg = fs.readFileSync('./bg.jpg');
var fav_ico = fs.readFileSync('./favicon.ico');
//var messages = [];
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};

var handler = {};
handler['/'] = function(req,res){
	var req_url = url.parse(req.url,true);
	var query = req_url.query; 
	var user = query.name ;
    var msg = query.message;
    var item = user + " : " + msg;
  	user && msg && messages.push(item) && fs.writeFileSync(msgFileName,JSON.stringify(messages));
    res.writeHead(200, {'Content-Type': contentType.html});
    res.write(template.replace(/{MESSAGES}/,messages.join('<br/>'))); 
  	res.end();
};
handler['/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
    res.write(bg_jpg); 
  	res.end();	
};
handler['/favicon.ico'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.ico});
    res.write(fav_ico); 
  	res.end();	
};

exports.routes = handler;