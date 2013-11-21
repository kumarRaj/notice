var system = require('system');
console.log(system.args);

var passValue = function(){
	document.getElementsByName("userID")[0].value='a';
	document.getElementsByName("password")[0].value='s';
	document.getElementsByTagName('input')[0].click();
	return document;
};

var page = require('webpage').create();
var runPage = function (status) {
	if(status !== 'success') phantom.exit();
	page.render('searchResult.png');	
		page.onLoadFinished = function(status) {
  		var result = page.evaluate(passValue);
};		
	phantom.exit();
}

var url = 'http://localhost:8085/';
page.open(url,runPage);