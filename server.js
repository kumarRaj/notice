/* --- Prep ---- */
var fs = require('fs');
var http = require('http');
// var notice1 = {};
// notice1.sender = "Kavita";
// notice1.date = new Date(2001,1,2);
// notice1.subject = "Welcome";
// notice1.message = "Hi, Welcome to this service";

// var repository = [];
// repository.push(notice1);
// var notice2 = {};

// notice2.sender = "Suraj";
// notice2.date = new Date(2013,1,2);
// notice2.subject = "First Use";
// notice2.message = "I love this notice Board";
// repository.push(notice2);

/* --- Prep ---- */

var displayNotice = function(request, response){
  repository = JSON.parse(fs.readFileSync("notices.txt"));
  response.write("Hello World");
 //  repository.forEach(function(notice){
 //    response.write(JSON.stringify(notice));
 //  })
	repository.forEach(function(notice){
    response.write("Author : " + notice.sender + '\n');
    response.write("Date : " + notice.date + '\n');
    response.write("Subject : " + notice.subject + '\n');
    response.write(notice.message + '\n\n');
  });
}
var path = "see";
var server = function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  if(path == "see"){
    displayNotice(request,response);
  }
  response.end();
}

http.createServer(server).listen(8085);