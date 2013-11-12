/* --- Prep ---- */
var fs = require('fs');
var http = require('http');
var url = require('url');
/* --- Prep ---- */

var getNotice = function(request,response){
  var notice = {};
  address = url.parse(request.url,true);
  notice.sender = address.hostname;
  notice.subject = address.query.subject;
  notice.message = address.query.message;
  notice.date = new Date();
  return notice;
}

var addNotice =function(request,response){
  notice = getNotice(request,response)
  repository = JSON.parse(fs.readFileSync("notices.txt"));
  repository.push(notice);
  fs.writeFileSync('notices.txt',JSON.stringify(repository));
  response.write("Notice put on board. Go to this URL to see notice http://10.4.31.199:8085/see")
}

var displayNotice = function(request, response){
  repository = JSON.parse(fs.readFileSync("notices.txt"));
  response.write("Hello World");
	repository.forEach(function(notice){
    response.write("Author : " + notice.sender + '\n');
    response.write("Date : " + notice.date + '\n');
    response.write("Subject : " + notice.subject + '\n');
    response.write(notice.message + '\n\n');
  });
}
var path;
var server = function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  address = url.parse(request.url,true);
  path = address.pathname.slice(1);
  if(path == "post")
    addNotice(request,response);
  if(path == "see"){
    displayNotice(request,response);
  }
  response.end();
}

http.createServer(server).listen(8085);