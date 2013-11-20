var system = require('system');
console.log(system.args);
var searchText = system.args[1];

var _read_title_and_links = function(){
	var items = [];
	var h3s = document.getElementsByTagName('h3');
	for(var i=0;i<h3s.length;i++){
		var a = h3s[i].getElementsByTagName('a')[0];
		items.push({title:a.text,link:a.href});
	}
	return items;
};

var page = require('webpage').create();
// page.onNavigationRequested = function(url, type, willNavigate, main) {
//     console.log('Trying to navigate to: ' + url);
//     console.log('Caused by: ' + type);
//     console.log('Will actually navigate: ' + willNavigate);
//     console.log("Sent from the page's main frame: " + main);
// }
var collectItems = function (status) {
	if(status !== 'success') phantom.exit();
	page.render('searchResult.png');	
	var result = page.evaluate(_read_title_and_links);
	result.forEach(function(r){console.log(r.title,r.link);});
	phantom.exit();
}

var url = 'http://localhost:8085/';
page.open(url,collectItems);