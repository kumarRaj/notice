var nodemailer = require('nodemailer');
var mailSender = {};
mailSender.transport = nodemailer.createTransport("SMTP", {
        auth: {
            user: "step2noticeboard@gmail.com",
        pass: "a1!b2@c3#d4$e5%"
        }
    });

mailSender.message = {
    from: 'STEP 2 noticeboard <sender@example.com>',
    subject: 'verification code', //
    text: 'please enter this code into verification field\r\n'+
    'verification code = RANDOMCODE'
  };
exports.mailSender = mailSender;