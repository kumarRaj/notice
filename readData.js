var fs = require('fs');
var result;
var Notice = function(){
	console.log(result);
}
var callback = function read(err,data){
		if(err){
			throw err;
		}
		result = data;
		Notice();
};
var data = fs.readFile('notices.txt','utf-8',callback);
