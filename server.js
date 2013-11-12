var showOutput = function(request, response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	inputUrl = request.url;
	id = require('url').parse(inputUrl,true);
	path = id.pathname.substr(1);
	if(path == "add2")
  		response.write(lib.sum2(id.query).toString());
  	if(path == "accumulate"){
  		sum = lib.accumulate(id.query,sum);
      response.write(sum.toString());
  		// response.write('Accumulation ' + sum);
  	}
  	if(path == "reset")
  		sum = 0;
  	response.end();
}

http.createServer(showOutput).listen(8282);