var http = require('http');
var url = require('url');
var path = require('./request_handler.js').path;

var out_of_stock = function(req,res){
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('I dont have it');
  res.end();
};

var service = function(req, res){
  address = url.parse(req.url,true);
  var method = path[address.pathname] || out_of_stock;
  method(req,res);
};

http.createServer(service).listen(8085);
console.log('Server running at http://localhost:8085/');