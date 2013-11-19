var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport("SMTP", {
        auth: {
            user: "step2noticeboard@gmail.com",
        pass: "a1!b2@c3#d4$e5%"
        }
    });

var message = {
    from: 'step2noticeboard <sender@example.com>',
    to: '"Receiver Name" <aniketsurvase@gmail.com>',
    subject: 'verification code', //
    text: 'sdg345dfh56!@#$'
  };

transport.sendMail(message, function(error){
    if(error){
        console.log('Error occured\r\n'+error.message);
        return;
    }
});