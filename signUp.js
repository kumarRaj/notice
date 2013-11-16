var url = require('url');
var http = require('http');

var signUpDetails = JSON.parse(fs.readFileSync("./notice_files/dataBase/signUp.json",'utf-8'));
var signUpPage =fs.readFileSync("./notice_files/html/signUp.html",'utf-8');

var getUserInfo = function(req,res){
    var errorMsg="Pas<div id=\"reg_error_inner\" class=\"_58mo\">";
    var errorlength = errorMsg.length+37;
    var  userInfo= {};
    var address = url.parse(req.url,true);
    	if(address.query.Npwd!=address.query.Cpwd)
            errorMsg += " password ";
        if(address.query.Email!=address.query.cEmail)
            errorMsg += " Email Address ";
            errorMsg += "do not match. Please try again.</div>"
        if(errorlength<errorMsg.length)   
            res.write(signUpPage.replace(/{Error}/,errorMsg));
    	userInfo.uName = address.query.uName;
	    userInfo.PassWord = address.query.Npwd;
        userInfo.Email = address.query.Email;
        signUpDetails.push(userInfo);
  	fs.writeFile('./notice_files/dataBase/signUp.json',JSON.stringify(signUpDetails));
    }
	   
    return 0;
}