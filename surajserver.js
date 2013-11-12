var http = require('http');
var url = require('url');
var notice = {};
notice.sender = "divya";
notice.date = new Date();
notice.message = "Hi, Welcome to this service";
notice.subject = "thoughtworks";

var task = "show"; 

var repository = [];

var getNotice = function(request,response){
	var notice = {};
	address = url.parse(request.url,true);
	notice.sender = address.hostname;
	notice.subject = address.query.subject;
	notice.message = address.query.message;
	notice.date = new Date();

}

var address,method,parameters;

http.createServer(function (request,response) {
response.writeHead(200,{'content-Type':'text/html'});


task = address.pathname.slice(1);

console.log(JSON.stringify(address) + '\n\n\n');

response.write(JSON.stringify(notice));

// response.write(notice.sender.toString());
// response.write(notice.subject.toString);
// response.write(notice.address.toString);
// response.write(notice.date.toString);

response.end();
}).listen(8084);
console.log("server is running on - \t 10.4.31.199");