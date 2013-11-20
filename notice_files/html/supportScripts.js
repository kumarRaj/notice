function checkMail(){
	var mail = document.getElementsByName('Email')[0].value;
	var cmail = document.getElementsByName('cEmail')[0].value;
	if(mail!=cmail){
		alert("Email missmatched!");
		return false;
	}
	else return true;
};