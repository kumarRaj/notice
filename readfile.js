var fs = require('fs');
var pages = {};
var noticeExists = fs.existsSync('./notice_files/dataBase/notices.json');
var loginExists = fs.existsSync('./notice_files/dataBase/loginDetails.json');
pages.viewnotice = fs.readFileSync("./notice_files/html/viewNotice.html",'utf-8')
pages.addNotice_html = fs.readFileSync('./notice_files/html/addnotice.html');
pages.noticeBoard = noticeExists && JSON.parse(fs.readFileSync('./notice_files/dataBase/notices.json','utf-8')) || [];
pages.loginDetails = loginExists && JSON.parse(fs.readFileSync('./notice_files/dataBase/loginDetails.json','utf-8'))||[];
// pages.contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
pages.bg_jpg = fs.readFileSync('./notice_files/images/bg.jpg');	
pages.signUp =fs.readFileSync("./notice_files/html/signUp.html",'utf-8');
pages.home = fs.readFileSync("./notice_files/html/home.html",'utf-8');
pages.home = pages.home.replace(/{status1}/,"display:block;");
pages.home = pages.home.replace(/{status2}/,"display:none;");
pages.home = pages.home.replace(/{status3}/,"display:none;");

exports.pages = pages;