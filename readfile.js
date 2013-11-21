var fs = require('fs'); 
var pages = {}; // object for storing pages requisted by browser
var path = {};	// object for storing path of required files to load server

				//storing path for each file
path.home = "./notice_files/html/home.html";		
path.viewnotice = "./notice_files/html/viewNotice.html";
path.addNotice_html = './notice_files/html/addnotice.html';
path.signUp = "./notice_files/html/signUp.html";
path.verification = "./notice_files/html/verification.html";
path.noticesJson = './notice_files/dataBase/notices.json';
path.loginJson = './notice_files/dataBase/loginDetails.json';
path.signUpJson = './notice_files/dataBase/signUpData.json';
				//checking for existence of files
var noticeExists = fs.existsSync(path.noticesJson);
var loginExists = fs.existsSync(path.loginJson);
var signUpExists = fs.existsSync(path.signUpJson);
				//reading html pages from file system
pages.home = fs.readFileSync(path.home,'utf-8');
pages.viewnotice = fs.readFileSync(path.viewnotice,'utf-8');
pages.addNotice_html = fs.readFileSync(path.addNotice_html,'utf-8');
pages.signUp =fs.readFileSync(path.signUp,'utf-8');
pages.verification = fs.readFileSync(path.verification,'utf-8');
			//reading database files
pages.noticeBoard = noticeExists && JSON.parse(fs.readFileSync(path.noticesJson,'utf-8')) || [];
pages.loginDetails = loginExists && JSON.parse(fs.readFileSync(path.loginJson,'utf-8'))||{};
pages.signUpData = signUpExists && JSON.parse(fs.readFileSync(path.signUpJson,'utf-8'))||{};

pages.back_jpg = fs.readFileSync('./notice_files/images/back.jpg');
pages.bg_jpg = fs.readFileSync('./notice_files/images/bg.jpg');        

pages.sth_css =fs.readFileSync("./notice_files/html/sth.css",'utf-8');
pages.supportScriptsJs =fs.readFileSync("./notice_files/html/supportScripts.js",'utf-8');
exports.pages = pages;