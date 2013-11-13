/* --- Prep ---- */
var fs = require('fs');
var http = require('http');
var url = require('url');
/* --- Prep ---- */

var getNotice = function(request,response){
  var notice = {};
  // if(notice.message)
  address = url.parse(request.url,true);
  notice.sender = address.query.author;
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
  response.writeHead(200, {"Content-Type":"text/html"});
  response.write("<html><body>");
  response.write('<a href = "http://10.4.31.199:8085/see">Notice added. Click to see the NOTICE BOARD</a>');
  response.write("</body></html>");
}

var displayNotice = function(request, response){
  repository = JSON.parse(fs.readFileSync("notices.txt"));
  response.write("NOTICE BOARD"+'\n\n');
  repository.reverse();
	repository.forEach(function(notice,index){
    response.write("ID : " + (index + 1) + '\n');
    response.write("Author : " + notice.sender + '\n');
    response.write("Date : " + notice.date + '\n');
    response.write("Subject : " + notice.subject + '\n');
    response.write(notice.message + '\n\n');
  });
}
var path;
var server = function(request, response){
  response.writeHead(200, {"Content-Type":"text/plain"});
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